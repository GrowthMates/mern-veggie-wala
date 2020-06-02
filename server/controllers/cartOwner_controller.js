const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const NewCart = require('../models/admin/newCart')

const client = require('twilio')(accountSid, authToken);

module.exports={
 sendSMS(req,res){   
client.messages
  .create({
     body: 'You Have successfully withdraw the amount of Rs.15000.',//req.body.SMS,
     from: '+17027665765',
     to: '+923072468869'
   })
  .then(message => console.log('Message Sent======',message.sid)).catch(err=>{console.log('Message Error=====',err)});

},

getOrders(req, res){
  const { id } = req.params
  NewCart.findById(id).exec((err, result)=>{
    if(err){
      return  console.log('read orders Errors======>',err)
    }
    console.log('Get orders success',result);
    res.status(200).json(result);

  })

}

}