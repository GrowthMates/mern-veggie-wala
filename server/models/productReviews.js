const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productReviews = new Schema({
    star: {
        type: Number,
        required: true
      },
      review: {
        type: String,
        required: true
      }
})

module.exports = mongoose.model('ProductReview', productReviews);