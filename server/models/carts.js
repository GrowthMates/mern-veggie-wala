const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Carts = new Schema({
    products:[{
            name:{
                type:String,
                required:true
            },
            description:{
                    type:String,
                    required:true
            },
            price:{
                    type:Number,
                    required:true
            },
            stock:{
                    type:Number,
                    default:1
            },
            image: Array,
            imageId: Array,
    }],
    orders:[String]
});
module.exports = mongoose.model('Cart', Carts);