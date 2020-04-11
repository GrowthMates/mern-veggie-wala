// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Image = new Schema({

//         title: String,
//         image: String,
//         imageId: String,
//         product: String
        
//         // img:{
//         //         data:Buffer,
//         //         contentType: String
//         // }

// });
// module.exports = mongoose.model('Image',Image);


var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ItemSchema
var ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  review: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
});

// Create model from the schema
var Item = mongoose.model("Item", ItemSchema);

// Export model
// module.exports = Item;





// Get the Schema constructor
var Schema1 = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var ReviewSchema = new Schema1({
  stars: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

// Create model from the schema
var Review = mongoose.model("Review", ReviewSchema);

// Export model
module.exports = {Review,Item};