const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/complete-task', authMiddleware, async (req, res) => {
  try {
    const { taskId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { 'progress.completedTaskIds': taskId } },
      { new: true }
    );
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/uncomplete-task', authMiddleware, async (req, res) => {
  try {
    const { taskId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { 'progress.completedTaskIds': taskId } },
      { new: true }
    );
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/complete-day', authMiddleware, async (req, res) => {
  try {
    const { date } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { 'progress.completedDays': date } },
      { new: true }
    );
    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
