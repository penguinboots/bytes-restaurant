const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

/*
* user: { user details }
* order: { order details}
* estimatedEndTime: { from vendor input }
*/
module.exports = function(user, message) {
  client.messages
    .create({
      body: message,
      to: process.env.CLIENT_NUMBER, // Text this number
      from: process.env.TWILIO_NUM, // twillio's number
    })
    .then(message => console.log(message.sid));
};
