const { CronJob } = require('cron');
const { PasswordResets } = require('../../sequelize/models');
const Sequelize = require('sequelize');

// CRON JOB RUN EVERY 24H TO DELETE EXPIRATED TOKEN FROM PASSWORD RESETS
const jobClearExpiratedPasswordResets = new CronJob('0 0 0 * * *', async () => {
  const deletedResets = await PasswordResets.destroy(
    { where: { tokenExpires: { [Sequelize.Op.lte]: Sequelize.literal('NOW()') } } });
    console.log('CRON JOB PASSWORD RESETS - EXECUTED');
  });

module.exports = jobClearExpiratedPasswordResets;
