require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const progressRoutes = require('./routes/progress');
const Announcement = require('./models/Announcement');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/progress', progressRoutes);

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI, { dbName: 'myapp' })
  .then(async () => {
    console.log('MongoDB connected');
    
    // Clear out old unnecessary announcements so they immediately disappear for all users
    await Announcement.deleteMany({ _id: { $in: ['welcome-v1', 'profile-tip-v1'] } });

    // Seed the new singular development announcement
    const devAnnouncement = await Announcement.findById('dev-update-v1');
    if (!devAnnouncement) {
      await Announcement.create({
        _id: 'dev-update-v1',
        message: 'Hello there! I am currently working on developing this website more and in a beautiful manner, if you have any suggestion of what I should add next or if you need some features, feel free to drop in feedback in profile section. I will certainly do so.'
      });
      console.log('Seeded new developer announcement.');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Graceful failure: don't crash entirely here, but log appropriately
  });

// Start the server for Render or locally
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server startup errors
server.on('error', (err) => {
  console.error('Failed to start server:', err);
});
