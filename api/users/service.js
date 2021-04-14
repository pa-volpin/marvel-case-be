const model = require('./model');
const bcrypt = require('bcrypt');

const create = async ({ headers }, res, next) => {
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

  const pendingUser = await model.findPendingUser('token', token);

  if (!pendingUser) {
    const error = { status: 401, message: 'Unathorized' };
    return next(error);
  }
    
  const { tokenExpires } = pendingUser;
  const tokenIsValid = new Date(tokenExpires).getTime() >= new Date().getTime();
  if (!tokenIsValid) return next({ status: 401, message: 'Unathorized' });

  const { name, email, password } = pendingUser;

  const newUser = await model.createUser({ email, name, password });
  const { id } = newUser;

  if (id) return ({ status: 201, payload: id });

  return next();
};

const changeName = async ({ body, user }, res, next) => {
  if (body.email !== user.email) {
    const error = { status: 400, message: 'Invalid fields' };
    return next(error);
  }

  user.name = body.name;
  const userUpdated = await user.save();

  if (!userUpdated) {
    const error = ({ status: 500, message: 'Internal error' });
    return next(error);
  }

  const email = userUpdated.email;
  const name = userUpdated.name;
  return ({ status: 200, payload: { email, name } });};

const changePassword = async ({ body, user }, res, next) => {
  if (body.email !== user.email) {
    const error = { status: 400, message: 'Invalid fields' };
    return next(error);
  } 

  const passwordValid = await bcrypt.compare(body.oldPassword, user.password);

  if (!passwordValid) {
    const error = { status: 400, message: 'Invalid fields' };
    return next(error);
  }

  const hashedPass = await bcrypt.hash(body.newPassword, 9);

  user.password = hashedPass;
  const userUpdated = await user.save();

  if (!userUpdated) {
    const error = ({ status: 500, message: 'Internal error' });
    return next(error);
  }

  const email = userUpdated.email;
  const name = userUpdated.name;
  return ({ status: 200, payload: { email, name } });
};

const resetPassword = async ({ body, user }, res, next) => {
  if (body.email !== user.email) {
    const error = { status: 400, message: 'Invalid fields' };
    return next(error);
  }

  const hashedPass = await bcrypt.hash(body.password, 9);
  user.password = hashedPass;
  const userUpdated = await user.save();

  if (!userUpdated) {
    const error = ({ status: 500, message: 'Internal error' });
    return next(error);
  }

  return ({ status: 200, payload: { message: 'Password updated' } });
};

const getUser = async ({ user }, res, next) => {
  const { email, name } = user;
  return ({ status: 200, payload: { name, email } });
};


module.exports = { create, resetPassword, changeName, changePassword, getUser };
