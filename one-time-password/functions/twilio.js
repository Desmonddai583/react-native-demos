const twilio = require('twilio');

const accountSid = '';
const authToken = '';

module.exports = new twilio.Twilio(accountSid, authToken);