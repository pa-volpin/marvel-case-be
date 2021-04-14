const services = require('./service');
const { middleware } = require('bodymen');
const express = require('express');
const schema = require('../../sequelize/schemas/user-schema');
const checkToken = require('../middlewares/checkToken');

const controller = express();
const bodyCheck = middleware;
const { email } = schema;

const create = async (req, res, next) => {
  const response = await services.create(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const confirm = async (req, res, next) => {
  const response = await services.confirm(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

controller.post('/auth', confirm);
controller.post('/', bodyCheck({ email }), create);



module.exports = controller;