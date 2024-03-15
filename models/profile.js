const mongoose = require('mongoose');

// Define MongoDB Schema
const ProfileSchema = new mongoose.Schema({
  name: String,
  description: String,
  mbti: String,
  enneagram: String,
  variant: String,
  tritype: Number,
  socionics: String,
  sloan: String,
  psyche: String,
  image: String
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
