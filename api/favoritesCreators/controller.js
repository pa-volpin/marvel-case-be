const services = require('./service');
const { middleware } = require('bodymen');
const express = require('express');
const schema = require('../../sequelize/schemas/favorites');
const checkToken = require('../middlewares/checkToken');

const controller = express();
const bodyCheck = middleware;
const { name, marvelId, photo } = schema;

const create = async (req, res, next) => {
  const response= await services.create(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const remove = async (req, res, next) => {
  const response= await services.remove(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const getAll = async (req, res, next) => {
  const response= await services.getAll(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

const getByIds = async (req, res, next) => {
  const response= await services.getByIds(req, res, next);
  if (response) return res.status(response.status).json(response.payload);
};

controller.post('/', checkToken, bodyCheck({ name, marvelId, photo }), create);
controller.delete('/:marvelId', checkToken, remove);
controller.get('/:ids', checkToken, getByIds);
controller.get('/', checkToken, getAll);

module.exports = controller;
