const { CronJob } = require('cron');
const { PendingUsers } = require('../../sequelize/models');
const Sequelize = require('sequelize');

// CRON JOB RUN EVERY 24H TO DELETE EXPIRATED TOKEN FROM PENDING USERS
const jobClearExpiratedPendingUsers = new CronJob('0 0 0 * * *', async () => {
  const deletedResets = await PendingUsers.destroy(
    { where: { tokenExpires: { [Sequelize.Op.lte]: Sequelize.literal('NOW()') } } });
  console.log('CRON JOB PENDING USERS - EXECUTED');
});

module.exports = jobClearExpiratedPendingUsers;
