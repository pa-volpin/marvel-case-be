const model = require('./model');
const generateTemplate = require('../utils/emailTemplates/emailVerification');
const sendEmail = require('../utils/sendEmail');
const { v4 } = require('uuid');

const uuidv4 = v4;

const create = async ({ body }, res, next) => {
  const { name, email, password } = body;
  const user = await model.findUser('email', email);

  if (user) {
    const error = ({ status: 409, message: 'Email is already used' });
    return next(error);
  }

  await model.removePendingUser('email', email);

  const pendingUser = await model.createPendingUser({ email, name, password });
  const { id } = pendingUser;

  if (id) {
    const { token } = pendingUser;
    const userName = pendingUser.name;
    const message = generateTemplate({ userName, token });
    const emailAddress = pendingUser.email;

    const response = await sendEmail({ emailAddress, message })
      .then(() => {
        const status = 201;
        const payload = { message: 'Email verification was sent to your email' };
        const response = { status, payload };
        return response;
      })
      .catch(() => next({ status: 500, message: 'Internal error' }));

    return response;
  }

  return next();
};

module.exports = { create };
