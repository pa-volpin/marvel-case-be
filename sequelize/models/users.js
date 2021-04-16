const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const models = require('../models');

const uuidv4 = v4;

const adjustsBeforeCreate = async (user) => {
  try {
    if (!user.id) user.id = uuidv4();
  } catch (err) {
    // errorHandler(err)
    console.log(err);
  }
};

const adjustsBeforeUpdate = async (user) => {
  try {
    const hashedPass = await bcrypt.hash(user.password, 9);
    user.password = hashedPass;
  } catch (err) {
    // errorHandler(err)
    console.log(err);
  }
};

const Users = (sequelize, DataTypes) => {
  const UsersModel = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    photo: { type: DataTypes.STRING, defaultValue: "" },
    password: DataTypes.STRING,
  },
  {
    hooks: {
      beforeCreate: adjustsBeforeCreate,
      // beforeUpdate: adjustsBeforeUpdate
    },
  },
  // { timestamps: false }
  );

  UsersModel.associate = (models) => {
    UsersModel.hasMany(models.PasswordResets, { foreignKey: 'id', as: 'resetsUsers' });
  };

  UsersModel.associate = (models) => {
    UsersModel.hasMany(models.FavoritesCharacters, { foreignKey: 'id', as: 'favoritesCharactersUsers' });
  };

  return UsersModel;
};

module.exports = Users;
