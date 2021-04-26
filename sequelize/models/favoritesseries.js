const { v4 } = require('uuid');
const models = require('.');

const uuidv4 = v4;

const adjustsBeforeCreate = async (favorite) => {
  try {
    if (!favorite.id) favorite.id = uuidv4();
  } catch (err) {
    // errorHandler(err)
    console.log(err);
  }
};

const FavoritesSeries = (sequelize, DataTypes) => {
  const FavoritesSeriesModel = sequelize.define('FavoritesSeries', {
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

  FavoritesSeriesModel.associate = (models) => {
    FavoritesSeriesModel.belongsTo(models.Users, { foreignKey: 'id', as: 'favoritesSeriesUsers' });
  };

  return FavoritesSeriesModel;
};

module.exports = FavoritesSeries;
