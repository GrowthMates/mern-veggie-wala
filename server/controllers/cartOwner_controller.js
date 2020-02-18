const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

module.exports={
 sendSMS(req,res){   
client.messages
  .create({
     body: req.body.SMS,
     from: '+17027665765',
     to: '+923072468869'
   })
  .then(message => console.log('Message Sent======',message.sid)).catch(err=>{console.log('Message Error=====',err)});

}}