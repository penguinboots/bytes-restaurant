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
      to: `+1${user.phone_number}`, // Text this number
      from: '+15674093873', // twillio's number
    })
    .then(message => console.log(message.sid));
};
