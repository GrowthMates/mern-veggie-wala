const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({

        name:{
                type:String,
                trim:true
                // required:true
        },
        description:{
                type:String,
                // required:true
        },
        price:{
                type:Number,
                trim:true
                // required:true
        },
        stock:{
                type:String,
                default:1
        },
        images: Array,
        
        category: {
                type: String
        },
        status: {
                type: String,
        },
        productStatus:{
                type:String,
                default:'offline'
        },
        productType:{
                type:String,
                default:'Simple product'
        },
        alarmingStock: {
                type: String
        },
        cartStock: Array,
        tag:{
                type:String,
        }

        
        // img:{
        //        title:String,
        //        image:String,
        //        imageId:String
        // }

});
module.exports = mongoose.model('Product',Product);