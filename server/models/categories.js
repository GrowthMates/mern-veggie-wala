const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSpecs = new Schema({

        category:String,
        tag:String

});
module.exports = mongoose.model('ProductSpecs',ProductSpecs);