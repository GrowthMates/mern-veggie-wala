const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({

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
        // img:{
        //        title:String,
        //        image:String,
        //        imageId:String
        // }

});
module.exports = mongoose.model('Product',Product);