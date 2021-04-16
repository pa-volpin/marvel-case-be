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

const FavoritesStories = (sequelize, DataTypes) => {
  const FavoritesStoriesModel = sequelize.define('FavoritesStories', {
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

  FavoritesStoriesModel.associate = (models) => {
    FavoritesStoriesModel.belongsTo(models.Users, { foreignKey: 'id', as: 'favoritesStoriesUsers' });
  };

  return FavoritesStoriesModel;
};

module.exports = FavoritesStories;
