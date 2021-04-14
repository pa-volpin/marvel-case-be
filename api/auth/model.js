const bcrypt = require('bcrypt');
const { Users } = require('../../sequelize/models');

const findUser = (property, value) => Users.findOne({ where: { [property]: value } });

module.exports = { findUser };
