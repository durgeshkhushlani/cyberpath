const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  _id:       String,           // short slug like 'welcome-v1'
  message:   String,
  createdAt: { type: Date, default: Date.now },
  active:    { type: Boolean, default: true },
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
