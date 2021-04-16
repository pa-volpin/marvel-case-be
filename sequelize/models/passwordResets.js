const { v4 } = require('uuid');
const models = require('../models');

const uuidv4 = v4;

const adjustsBeforeCreate = async (reset) => {
  try {
    if (!reset.id) {
      reset.id = uuidv4();
      reset.token = uuidv4();
      reset.tokenExpires = Date.now() + 10 * 60 * 1000;
    }
  } catch (err) {
    // errorHandler(err)
    console.log(err);
  }
};

const PasswordResets = (sequelize, DataTypes) => {
  const PasswordResetsModel = sequelize.define('PasswordResets', {
    userId: { type: DataTypes.STRING, foreignKey: true },
    token: DataTypes.STRING,
    tokenExpires: DataTypes.DATE
  },
  {
    hooks: {
      beforeCreate: adjustsBeforeCreate,
    },
  },
  // { timestamps: false }
  );

  PasswordResetsModel.associate = (models) => {
    PasswordResetsModel.belongsTo(models.Users, { foreignKey: 'id', as: 'resetsUsers' });
  };

  return PasswordResetsModel;
};

module.exports = PasswordResets;
