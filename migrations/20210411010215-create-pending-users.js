'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PendingUsers', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        trim: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      token: {
        allowNull: false,
        type: Sequelize.UUID,
        unique: true
      },
      tokenExpires : {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PendingUsers');
  }
};