'use strict';

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

//add new comment
router.post('/', async (req, res) => {
    try {
        const { userId, profileId, title, description, votes } = req.body;
        const newComment = await Comment.create({ user: userId, profile: profileId, title, description, votes });
        res.json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//get  comments 
router.get('/', async (req, res) => {
    try {
      const { mbti, enneagram, zodiac, sortBy, profileId } = req.query;
      const filter = {};
      if (mbti) filter['votes.mbti'] = mbti;
      if (enneagram) filter['votes.enneagram'] = enneagram;
      if (zodiac) filter['votes.zodiac'] = zodiac;
      if (profileId) filter['profile'] = profileId;
  
       //find comments by filter
      let comments = await Comment.find(filter);
      
      //sort comments by parameter
      if (sortBy === 'likes') {
        comments = comments.sort((a, b) => b.likes - a.likes);
      } else if (sortBy === 'recent') {
        comments = comments.sort((a, b) => b.createdAt - a.createdAt);
      }

      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//liking a comment
router.post('/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        const like = req.query.like === 'true';

        let updateQuery = {};
        if (like) {
            updateQuery = { $inc: { likes: 1 } };
        } else {
            updateQuery = { $inc: { likes: -1 } };
        }
        // Find the comment by ID and update likes count
        const comment = await Comment.findByIdAndUpdate(commentId, updateQuery, { new: true });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});  

module.exports = router;