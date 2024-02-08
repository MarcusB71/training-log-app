const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const HTTP_PORT = 8080;

mongoose.connect(process.env.MONGOSTRING);

//middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// login and signup /post in userRoutes.js
app.use('/', userRoutes);

app.get('/api', (req, res) => {
  res.json({ users: ['user1', 'user2', 'user3'] });
});

app.listen(HTTP_PORT, () => {
  console.log(`app listening on: ${HTTP_PORT}`);
});
