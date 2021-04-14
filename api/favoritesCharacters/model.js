const { FavoritesCharacters } = require('../../sequelize/models');
const models = require('../../sequelize/models');
const { Op } = require('sequelize');

const findFavorite = (property, value, idUser) =>
  FavoritesCharacters.findOne({ where: { [property]: value, userId: idUser } });

const removeFavorite = (idMarvel, idUser) =>
  FavoritesCharacters.destroy({ where: { marvelId: idMarvel, userId: idUser } });

const findAllFavorites = (idUser, { queryText = '', limit = 10, offset = 0, order = 'ASC' }) => {
  const limitVerified = limit > 100 ? 100 : limit;
  return FavoritesCharacters.findAll({
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
  return FavoritesCharacters.count({ where: { userId: idUser } });
};

const findByIds = (marvelIds, idUser) =>
  FavoritesCharacters.findAll({ where: {
    userId: idUser,
    marvelId: {
      [Op.in]: marvelIds
    },
  },
  attributes: ['marvelId']
});

const createFavorite = ({ userId, marvelId, name = '', photo = '' }) =>
  FavoritesCharacters.create({ marvelId, name, photo, userId });

module.exports = {
  findFavorite,
  createFavorite,
  removeFavorite,
  findAllFavorites,
  countFavorites,
  findByIds
};
