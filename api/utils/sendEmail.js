const AWS_SES = require('aws-sdk/clients/ses');
const { config } = require('dotenv');

config();
const SES = new AWS_SES();

const sendEmail = async ({ emailAddress, message }) => {
  return await SES.sendEmail({
    Source: 'Volpin Marvel Comics <volpindev@gmail.com>',
    Destination: {
      ToAddresses: [emailAddress],
    },
    Message: message
  }).promise();
};

module.exports = sendEmail;