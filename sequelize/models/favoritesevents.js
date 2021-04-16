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

const FavoritesEvents = (sequelize, DataTypes) => {
  const FavoritesEventsModel = sequelize.define('FavoritesEvents', {
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

  FavoritesEventsModel.associate = (models) => {
    FavoritesEventsModel.belongsTo(models.Users, { foreignKey: 'id', as: 'favoritesEventsUsers' });
  };

  return FavoritesEventsModel;
};

module.exports = FavoritesEvents;
