const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const Announcement = require('../models/Announcement');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { displayName, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, { displayName, email }, { new: true }).select('-passwordHash');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Onboarding preferences
router.post('/onboarding', authMiddleware, async (req, res) => {
  try {
    const { selectedMode, learningStyle, totalTasksInMode } = req.body;
    const user = await User.findById(req.user.userId);
    user.selectedMode = selectedMode;
    user.learningStyle = learningStyle;
    user.onboardingDone = true;
    user.modeStartDate = new Date();
    user.progress.totalTasksInMode = totalTasksInMode || 0;
    // reset tracking
    user.progress.completedTaskIds = [];
    user.progress.completedDays = [];
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reset-onboarding', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.onboardingDone = false;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Announcements
router.get('/announcements', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const announcements = await Announcement.find({ active: true });
    
    // filter out dismissed
    const activeForUser = announcements.filter(a => !user.dismissedAnnouncements.includes(a._id));
    res.json(activeForUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/dismiss-announcement/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(req.user.userId, { $addToSet: { dismissedAnnouncements: id } });
    res.json({ message: 'Dismissed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const nodemailer = require('nodemailer');

// Feedback email actual delivery via SMTP
router.post('/feedback', async (req, res) => {
  try {
    const { email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'no-reply@cyberpath.com',
      to: 'itsdarickkurin@gmail.com',
      subject: `CyberPath App Feedback`,
      text: `You have received new feedback from the CyberPath application.\n\nSender Email Provided: ${email || 'None'}\n\nMessage:\n${message || 'No message content'}`
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email Success] Feedback routed to itsdarickkurin@gmail.com`);
    res.json({ message: 'Feedback sent successfully.' });
  } catch (error) {
    console.error('[Email Error] Failed to send feedback via Nodemailer:', error);
    // Return 500 so the frontend indicates failure if SMTP crashes
    res.status(500).json({ message: 'Failed to send feedback' });
  }
});

module.exports = router;
