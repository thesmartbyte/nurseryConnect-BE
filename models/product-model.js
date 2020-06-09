const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        name: { type: String, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('product', Product)