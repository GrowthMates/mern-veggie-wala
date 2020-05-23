const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({

        name:{
                type:String,
                // required:true
        },
        description:{
                type:String,
                // required:true
        },
        price:{
                type:Number,
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
        alarmingStock: {
                type: String
        },
        cartStock: Array,

        
        // img:{
        //        title:String,
        //        image:String,
        //        imageId:String
        // }

});
module.exports = mongoose.model('Product',Product);