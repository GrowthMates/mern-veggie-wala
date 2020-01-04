const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PendingProduct = new Schema({

        name:{
                type:String,
                required:true
        },
        description:{
                type:String,
                required:true
        },
        price:{
                type:String,
                required:true
        },
        quantity: {
            type:Number,
            required:true
        },
      user: {
          type: String
      }


});
module.exports = mongoose.model('Pending-Product',PendingProduct);