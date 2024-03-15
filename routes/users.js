'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }
  });

const User = mongoose.model('User', UserSchema);

//create a new user account
router.post('/', async (req, res) => {
    try {
      const { name } = req.body;
      const user = await User.create({ name });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//get users
router.get('/', async (req, res) => {
    try {      
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;

