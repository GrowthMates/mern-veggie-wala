const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productReviews = new Schema({
    customerName: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String,
      required: true
    },
    star: {
        type: Number,
        required: true
      },
      reviewTitle: {
        type: String,
        required: true
      },
      review: {
        type: String,
        required: true
      }
})

module.exports = mongoose.model('ProductReview', productReviews);