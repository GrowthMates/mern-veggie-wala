const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishList = new Schema({

    //For initial testing---
    // fname:{
    //     type:String,
    //     required:true
    // },
   
    // productName: {
    //     type: String
    // },

    userId:String,
    products:[String]
   
});
module.exports = mongoose.model('WishList', WishList);