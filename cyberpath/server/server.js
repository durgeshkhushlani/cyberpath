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

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { dbName: 'myapp' })
  .then(async () => {
    console.log('MongoDB connected');
    
    // Seed initial announcements
    const welcomeAnnouncement = await Announcement.findById('welcome-v1');
    if (!welcomeAnnouncement) {
      await Announcement.create({
        _id: 'welcome-v1',
        message: 'Welcome to CyberPath. Your roadmap is ready. Head to the Roadmap tab to begin your first session. Track your progress daily and use the News section to stay current with the industry.'
      });
      console.log('Seeded welcome announcement.');
    }
    
    const profileAnnouncement = await Announcement.findById('profile-tip-v1');
    if (!profileAnnouncement) {
      await Announcement.create({
        _id: 'profile-tip-v1',
        message: 'You can change your password anytime from your Profile page. Your password is stored as a bcrypt hash — it is not accessible to anyone, including the platform administrators.'
      });
      console.log('Seeded profile tip announcement.');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server only if we are not running in a Vercel serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel Serverless
module.exports = app;
