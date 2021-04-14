const model = require('./model');
const sendEmail = require('../utils/sendEmail');
const generateTemplate = require('../utils/emailTemplates/passwordReset');
const generateToken = require('../utils/generateToken');

const create = async ({ body }, _res, next) => {
  const user = await model.findUser('email', body.email);

  if (!user) {
    const error = { status: 400, message: 'Invalid fields' };
    return next(error);
  }

  const userId = user.id;

  await model.removePasswordReset('userId', userId);
  
  const reset = await model.createPasswordReset(userId);

  if (!reset) {
    const error = ({ status: 500, message: 'Internal error' });
    return next(error);
  }

  const { token } = reset;
  const userName = user.name;
  const message = generateTemplate({ userName, token });
  const emailAddress = user.email;

  const response = await sendEmail({ emailAddress, message })
    .then(() => {
      const status = 200;
      const payload = { message: 'Password reset was sent to your email' };
      const response = { status, payload };
      return response;
    })
    .catch(() => next({ status: 500, message: 'Internal error' }));

  return response;
};

const confirm = async ({ headers }, _res, next) => {
  const { authorization } = headers;

  if (!authorization) {
    const error = { status: 401, message: 'Unathorized' };
    return next(error);
  }

  const token = authorization.split(" ")[1];
  if (!token)  {
    const error = { status: 401, message: 'Unathorized' };
    return next(error);
  }

  const passwordReset = await model.findPasswordReset('token', token);

  if (!passwordReset) {
    const error = { status: 401, message: 'Unathorized' };
    return next(error);
  }

  const { tokenExpires } = passwordReset;
  const tokenIsValid = new Date(tokenExpires).getTime() >= new Date().getTime();
  if (!tokenIsValid) return next({ status: 401, message: 'Unathorized' });

  const duration = '1h';
  const id = passwordReset.userId;
  const tag = 'resetpassword';
  const newToken = generateToken({ id, tag }, duration);

  const userId = passwordReset.userId;
  const user = await model.findUser('id', userId);

  if (!user) {
    const error = { status: 401, message: 'Unathorized' };
    return next(error);
  }

  await passwordReset.destroy();

  return ({ status: 200, payload: { token: newToken, email: user.email } });  
};

module.exports = { create, confirm };
