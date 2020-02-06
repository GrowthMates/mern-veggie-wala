const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = new Schema({

        title: String,
        image: String,
        imageId: String,
        product: String
        
        // img:{
        //         data:Buffer,
        //         contentType: String
        // }

});
module.exports = mongoose.model('Image',Image);