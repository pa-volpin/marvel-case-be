const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const models = require('../models');

const uuidv4 = v4;

const adjustsBeforeCreate = async (user) => {
  try {
    if (!user.id) {
      const hashedPass = await bcrypt.hash(user.password, 9);
      user.password = hashedPass;
      user.id = uuidv4();
      user.token = uuidv4();
      user.tokenExpires = Date.now() + 60 * 60 * 1000;
    }
  } catch (err) {
    // errorHandler(err)
    console.log(err);
  }
};

const PendingUsers = (sequelize, DataTypes) => {
  const PendingUsersModel = sequelize.define('PendingUsers', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    tokenExpires: DataTypes.DATE
  },
  {
    hooks: {
      beforeCreate: adjustsBeforeCreate
    },
  },
  // { timestamps: false }
  );

  return PendingUsersModel;
};

module.exports = PendingUsers;
