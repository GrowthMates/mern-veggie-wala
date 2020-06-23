const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactUs = new Schema({

        email:{
                type:String,
                required:true
        },
       
       name:{
        type:String,
        required:true
        },
       phone:{
        type:String,
        required:true
        },
       subject:{
        type:String,
        required:true
            },

       message:{
        type:String,
        required:true
        },
      


});
module.exports = mongoose.model('ContactUs',ContactUs);