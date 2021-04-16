const services = require('./service');
const { middleware } = require('bodymen');
const express = require('express');
const schema = require('../../sequelize/schemas/user-schema');
const checkToken = require('../middlewares/checkToken');

const controller = express();
const bodyCheck = middleware;
const { name, email, password } = schema;

const create = async (req, res, next) => {
  const response= await services.create(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const changeName = async (req, res, next) => {
  const response = await services.changeName(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const changePassword = async (req, res, next) => {
  const response = await services.changePassword(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const resetPassword = async (req, res, next) => {
  const response = await services.resetPassword(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const getUser = async (req, res, next) => {
  const response = await services.getUser(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const remove = async (req, res, next) => {
  const { status, payload } = await services.remove(req, res, next);
  return res.status(status).json(payload); 
};

controller.get('/getme', checkToken, getUser);
controller.post('/register', create);
controller.post('/resetpassword', checkToken, bodyCheck({ password, email }), resetPassword);
controller.post('/changename', checkToken, bodyCheck({ name, email }), changeName);
controller.post('/changepassword', checkToken,
bodyCheck({
  email,
  newPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  oldPassword: {
    type: String,
    required: true,
    minlength: 6,
  }
}),
changePassword);

controller.post('/unsubscribe', bodyCheck({ email, password }), remove);

module.exports = controller;
