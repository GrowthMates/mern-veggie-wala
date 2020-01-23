const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserCart = new Schema({

        userId: String,
        productId: String,
        name: String,
        price: Number,
        quantity:Number

});
module.exports = mongoose.model('UserCart',UserCart);