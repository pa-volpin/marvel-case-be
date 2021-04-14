const { Users, PendingUsers } = require('../../sequelize/models');
const models = require('../../sequelize/models');

const findUser = (property, value) => Users.findOne({ where: { [property]: value } });

const findPendingUser = (property, value) => PendingUsers.findOne({ where: { [property]: value } });

const createUser = async ({ email, name, password }) => {
  try {
    const userEmail = email;
    return await models.sequelize.transaction(async (t) => {
      const user = await Users.create({ name, email, password }, { transaction: t });
      
      await PendingUsers.destroy({ where: { email: userEmail } }, { transaction: t });

      return user;
    })
  } catch (error) {
    return ({ error });
  }
};

module.exports = { findUser, createUser, findPendingUser };
