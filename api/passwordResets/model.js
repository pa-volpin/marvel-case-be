const { Users, PasswordResets } = require('../../sequelize/models');

const findUser = (property, value) => Users.findOne({ where: { [property]: value } });
const createPasswordReset = (userId) => PasswordResets.create({ userId });
const removePasswordReset = (property, value)  => PasswordResets.destroy({ where: { [property]: value }});
const findPasswordReset = (property, value) => PasswordResets.findOne({ where: { [property]: value }});

module.exports = { findUser, createPasswordReset, removePasswordReset, findPasswordReset };
