const { FavoritesComics } = require('../../sequelize/models');
const models = require('../../sequelize/models');
const { Op } = require('sequelize');

const findFavorite = (property, value, idUser) =>
  FavoritesComics.findOne({ where: { [property]: value, userId: idUser } });

const removeFavorite = (idMarvel, idUser) =>
  FavoritesComics.destroy({ where: { marvelId: idMarvel, userId: idUser } });

const findAllFavorites = (idUser, { queryText = '', limit = 10, offset = 0, order = 'ASC' }) => {
  const limitVerified = limit > 100 ? 100 : limit;
  return FavoritesComics.findAll({
    where: {
      userId: idUser,
      name: { [Op.substring]: queryText }
    },
    offset: offset,
    limit: limitVerified,
    order: [['name', `${order}`]]
  });
};

const countFavorites = (idUser) => {
  return FavoritesComics.count({ where: { userId: idUser } });
};

const findByIds = (marvelIds, idUser) =>
  FavoritesComics.findAll({ where: {
    userId: idUser,
    marvelId: {
      [Op.in]: marvelIds
    },
  },
  attributes: ['marvelId']
});

const createFavorite = ({ userId, marvelId, name = '', photo = '' }) =>
  FavoritesComics.create({ marvelId, name, photo, userId });

module.exports = {
  findFavorite,
  createFavorite,
  removeFavorite,
  findAllFavorites,
  countFavorites,
  findByIds
};
