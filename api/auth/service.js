const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const model = require('./model');

const login = async ({ body }, _res, next) => {
  const user = await model.findUser('email', body.email);

  if (!user) {
    const error = { status: 403, message: 'Email or password incorrect' };
    return next(error);
  }

  const passwordIsValid = await bcrypt.compare(body.password, user.password);
  if (!passwordIsValid) {
    const error = { status: 403, message: 'Email or password incorrect' };
    return next(error);
  }

  const token = generateToken({ id: user.id });
  const name = user.name;
  const email = user.email;
  const response = ({ status: 200, payload: { token, name, email } });
  return response;
};

const checkMe = async (req, _res, next) => {
  const userFromToken = req.user;
  const tag = req.tag;

  if (tag === 'resetpassword') {
    const error = { status: 401, message: 'Unauthorized' };
    return next(error);
  }

  const user = await model.findUser('email', userFromToken.email);

  if (!user) {
    const error = { status: 401, message: 'Unauthorized' };
    return next(error);
  }

  const token = generateToken({ id: user.id });
  const name = user.name;
  const email = user.email;
  const response = ({ status: 200, payload: { token, name, email } });
  return response;
};

module.exports = { login, checkMe };
