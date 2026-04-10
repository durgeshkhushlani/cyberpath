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
    await Announcement.deleteMany({ _id: { $in: ['welcome-v1', 'profile-tip-v1', 'dev-update-v1', 'dev-update-v2', 'dev-update-v3', 'dev-update-v4'] } });

    // Seed the new singular development announcement
    const devAnnouncement = await Announcement.findById('dev-update-v5');
    if (!devAnnouncement) {
      await Announcement.create({
        _id: 'dev-update-v5',
        message: "Hello there! I am currently working on developing this website further. I've explicitly created it for single-person use for the next few days until new things can be added. If you have any suggestions on what I should add next or if you need specific features, feel free to drop them in the feedback section of your profile. Please keep this portal personal and don't share it around just yet, at least until it's ready to go fully public, thank you for the co-operation. Signing off...."
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
