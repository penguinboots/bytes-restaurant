const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

/*
* user: { user details }
* order: { order details}
* estimatedEndTime: { from vendor input }
*/
module.exports = function(user, order, estimatedEndTime) {
  client.messages
    .create({
      body: `Hello ${user.name}! Order #${order.id} is accepted. Your estimated pickup time is ${estimatedEndTime} mins`,
      to: `+1${user.phone_number}`, // Text this number
      from: '+15674093873', // twillio's number
    })
    .then(message => console.log(message.sid));
};
