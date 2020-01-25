const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Proceed = new Schema({

    //For initial testing---
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    appartment:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    timeStamp:{
        type: String,
        required: true,
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    productName: {
        type: String
    },
    cartProducts:[
        {
           name:String,
           price:Number,
           stock:Number,
           productId:String,
           quantity:Number
        }
    ]
});
module.exports = mongoose.model('Proceed', Proceed);