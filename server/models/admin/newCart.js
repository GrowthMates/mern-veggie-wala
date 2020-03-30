const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewCart = new Schema({

        cart:{
                type:String,
                // required:true
        },
       area: {
           type: String,
        //    required: true
       },
       block: Array,
       
       orders:Array
//        products:[{
//         name:{
//             type:String,
//         },
//         description:{
//                 type:String,
//         },
//         price:{
//                 type:Number,
//         },
//         stock:{
//                 type:Number,
//                 default:1
//         },
//         image: Array,
//         imageId: Array,
// }],


});
module.exports = mongoose.model('New-Cart',NewCart);