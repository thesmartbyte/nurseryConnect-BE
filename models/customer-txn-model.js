const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerTxn = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        mobile: { type: Number, required: true },
        email: { type: String, required: false },
        customerId: { type: String, required: false },
        nurseryId: { type: String, required: true },
        userId: { type: String, required: true },
        products: [{
          prd_id : {type: String, required: true},
          qty: {type: Number, required: true},
          listPrc: {type: Number, required: false},
          salePrc: {type: Number, required: false},
        }],
    },
    { timestamps: true },
)

module.exports = mongoose.model('customerTxn', CustomerTxn)