const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:       { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash:   { type: String, required: true },
  displayName:    { type: String, default: '' },
  email:          { type: String, default: '' },

  // Set during onboarding
  selectedMode:   { type: String, enum: ['deep_dive', 'standard', 'intensive', null], default: null },
  learningStyle:  { type: String, enum: ['day_based', 'task_based', null], default: null },
  onboardingDone: { type: Boolean, default: false },
  modeStartDate:  { type: Date, default: null },

  progress: {
    completedTaskIds: [String],     // IDs of completed tasks
    completedDays:    [String],     // 'YYYY-MM-DD' for day-based tracking
    totalTasksInMode: { type: Number, default: 0 },
  },

  dismissedAnnouncements: [String], // Announcement IDs user has dismissed

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
