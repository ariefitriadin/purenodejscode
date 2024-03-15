'use strict';

const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

// Define route to retrieve profile data
router.get('/:id', async (req, res) => {
  try {
      // Fetch data from MongoDB collection
      const profile = await Profile.findById(req.params.id);

      if (!profile) {
        res.status(404).json({ error: 'Profile not found' });
      }

      res.render('profile_template', {profile: profile});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Define route to add a new profile
router.post('/profile', async (req, res) => {
  try {
    const newProfile = req.body;
    const profile = await Profile.create(newProfile);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;