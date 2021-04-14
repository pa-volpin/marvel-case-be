const { Users } = require('../../sequelize/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const error = { status: 401, message: 'Unathorized' };

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return next(error);

  const token = authorization.split(" ")[1];
  if (!token) return next(error);

  const payloadDecoded = jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return next(error);
    return decoded;
  });

  const userId = payloadDecoded.id;
  const user = await Users.findByPk(userId);
  if (!user) return next(error);

  const tag = payloadDecoded.tag || '';
  req.user = user;
  req.tag = tag;
  next();
};

module.exports = checkToken;
