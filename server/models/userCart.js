const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserCart = new Schema({

        userId: String,
        productId: String,
        productsList:[{
                product:{
                        type:Schema.Types.ObjectId,
                        ref:"Product"
                },
                quantity:Number,
        }],
        name: String,
        price: Number,
        quantity:Number,
        cartTotalPrice:Number,

});
module.exports = mongoose.model('UserCart',UserCart);