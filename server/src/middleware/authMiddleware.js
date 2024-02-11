const authUtils = require('../utils/auth');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decodedToken = authUtils.verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  req.userId = decodedToken.userId;
  next();
};
module.exports = authenticateUser;
