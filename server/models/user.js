const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({

    //For initial testing---
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        // required:true
    },
    number:{
        type:String,
        // required:true
    },
    temporarytoken:{
        type:String,
        required:true,
    },
    active:{
        type:Boolean,
        default:false,
    }
});
module.exports = mongoose.model('User', User);