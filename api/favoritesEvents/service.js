const model = require('./model');
const bcrypt = require('bcrypt');

const create = async ({ body, user }, res, next) => {
  const favoriteExists = await model.findFavorite('marvelId', body.marvelId, user.id);

  if (favoriteExists) {
    const error = { status: 403, message: 'Already favorited' };
    return next(error);
  }
    
  const { name, marvelId, photo } = body;
  const userId = user.id;

  const newFavorite = await model.createFavorite({ name, marvelId, photo, userId });

  if (!newFavorite) {
    const error = { status: 400, message: 'Internal error' };
    return next(error);
  }

  const { id } = newFavorite;

  if (id) return ({ status: 201, payload: id });
  return next();
};

const remove = async ({ params, user }, res, next) => {
  const favoriteExists = await model.findFavorite('marvelId', params.marvelId, user.id);

  if (!favoriteExists) {
    const error = { status: 404, message: 'Is not favorited' };
    return next(error);
  }
    
  const removedFavorite = await model.removeFavorite(params.marvelId, user.id);

  if (!removedFavorite) {
    const error = { status: 400, message: 'Internal error' };
    return next(error);
  }

  return ({ status: 204, payload: params.marvelId });
};

const getAll = async ({ query, user }, res, next) => {
  const { q, limit: limitInput, page, orderBy } = query;
  const offset = page ? parseInt(page) - 1 : 0;
  const queryText = q || '';
  const limit = parseInt(limitInput) || 10;
  const order = orderBy === '-name' ? 'DESC' : 'ASC';
  
  const rows = await model.findAllFavorites(user.id, { queryText, offset, limit, order });

  if (!rows) {
    const error = { status: 400, message: 'Internal error' };
    return next(error);
  }

  const count = await model.countFavorites(user.id);

  if (!count) {
    const error = { status: 400, message: 'Internal error' };
    return next(error);
  }

  return ({ status: 200, payload: { rows, count } });
};

const getByIds = async ({ params, user }, res, next) => {
  const ids = params.ids.split(';');
  const favorites = await model.findByIds(ids, user.id);

  if (!favorites) {
    const error = { status: 400, message: 'Internal error' };
    return next(error);
  }

  const favoritesIds = favorites.map(f => f.dataValues.marvelId);
  return ({ status: 200, payload: { ids: favoritesIds} });
};

module.exports = { create, remove, getAll, getByIds };
