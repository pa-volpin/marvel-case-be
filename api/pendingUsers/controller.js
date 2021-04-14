const services = require('./service');
const { middleware } = require('bodymen');
const express = require('express');
const schema = require('../../sequelize/schemas/user-schema');

const controller = express();
const bodyCheck = middleware;
const { name, email, password } = schema;

const create = async (req, res, next) => {
  const response = await services.create(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

controller.post('/', bodyCheck({ name, email, password }), create);

module.exports = controller;
