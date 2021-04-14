const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const jwtConfig = (duration) => ({
  expiresIn: duration,
  algorithm: 'HS256',
});

const generateToken = (payload, duration = '7d') => {
  const token = jwt.sign(payload, jwtSecret, jwtConfig(duration));
  return token;
};

module.exports = generateToken;
