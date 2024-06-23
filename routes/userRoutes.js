const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'your_secret_key';

function generateToken(user) {
  const payload = {
    userId: user._id,
    role: user.role,
  };

  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate a token for the user
      const token = generateToken(user);
      return res.json({ token, role: user.role });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
});


router.post('/register', async (req, res) => {
        const { username, password, role } = req.body;
    
        try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            username,
            password: hashedPassword,
            role,
        });
    
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
        }
});  

module.exports = router;