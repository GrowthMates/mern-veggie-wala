const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserCart = new Schema({

        userId: String,
        productId: String,
        name: String,
        price: Number,
        quantity:{
                type:Number,
                default: 1
        },
        

});
module.exports = mongoose.model('UserCart',UserCart);