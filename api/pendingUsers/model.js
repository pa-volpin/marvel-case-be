const { PendingUsers, Users } = require('../../sequelize/models');

const findUser = (property, value) => Users.findOne({ where: { [property]: value } });
const findPendingUser = (property, value) => PendingUsers.findOne({ where: { [property]: value } });
const createPendingUser = ({ email, name, password }) => PendingUsers.create({ email, name, password });
const removePendingUser = (property, value) => PendingUsers.destroy({ where: { [property]: value } });

module.exports = { findUser, findPendingUser, createPendingUser, removePendingUser };
