const express = require('express');
const services = require('./service');
const { middleware } = require('bodymen');
const schema = require('../../sequelize/schemas/user-schema');
const checkToken = require('../middlewares/checkToken');

const controller = express();
const bodyCheck = middleware;
const { email, password } = schema;

const login = async (req, res, next) => {
  const { status, payload } = await services.login(req, res, next);
  return res.status(status).json(payload); 
};

const checkMe = async (req, res, next) => {
  const { status, payload } = await services.checkMe(req, res, next);
  return res.status(status).json(payload); 
};

controller.post('/login', bodyCheck({ email, password }), login);
controller.post('/checkme', checkToken, checkMe);

module.exports = controller;
