const { v4 } = require('uuid');
const models = require('../models');

const uuidv4 = v4;

const adjustsBeforeCreate = async (favorite) => {
  try {
    if (!favorite.id) favorite.id = uuidv4();
  } catch (err) {
    // errorHandler(err)
    console.log(err);
  }
};

const FavoritesComics = (sequelize, DataTypes) => {
  const FavoritesComicsModel = sequelize.define('FavoritesComics', {
    userId: { type: DataTypes.STRING, foreignKey: true },
    name: { type: DataTypes.STRING, defaultValue: "" },
    photo: { type: DataTypes.STRING, defaultValue: "" },
    marvelId: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: adjustsBeforeCreate,
    },
  },
  // { timestamps: false }
  );

  FavoritesComicsModel.associate = (models) => {
    FavoritesComicsModel.belongsTo(models.Users, { foreignKey: 'id', as: 'favoritesComicsUsers' });
  };

  return FavoritesComicsModel;
};

module.exports = FavoritesComics;
