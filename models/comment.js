// require mongoose
const mongoose = require('mongoose');

// create CommentSchema
const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    title: String,
    description: String,
    votes: {
      mbti: { type: String, enum: ['INFP', 'INFJ', 'ENFP', 'ENFJ', 'INTJ', 'INTP', 'ENTP', 'ENTJ', 'ISFP', 'ISFJ', 'ESFP', 'ESFJ', 'ISTP', 'ISTJ', 'ESTP', 'ESTJ'] },
      enneagram: { type: String, enum: ['1w2', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1'] },
      zodiac: { type: String, enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] }
    },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;