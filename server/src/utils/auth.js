const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;
const secretKey = process.env.SECRETKEY;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
const generateToken = async (userId, email) => {
  return jwt.sign({ userId, email }, secretKey, { expiresIn: '1m' });
};
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
