const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authUtils = require('../utils/auth');

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await authUtils.hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await authUtils.comparePassword(password, user.password))) {
      const token = await authUtils.generateToken(user._id, user.email);
      console.log(token);
      res.send({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
