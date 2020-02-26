const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewCart = new Schema({

        cart:{
                type:String,
                required:true
        },
       address: {
           type: String,
           required: true
       },
       products:[{
        name:{
            type:String,
        },
        description:{
                type:String,
        },
        price:{
                type:Number,
        },
        stock:{
                type:Number,
                default:1
        },
        image: Array,
        imageId: Array,
}],
       orders:Array


});
module.exports = mongoose.model('New-Cart',NewCart);