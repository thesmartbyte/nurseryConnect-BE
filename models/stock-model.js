const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = Schema({
  nurseryId: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  },
  stock: [{
    prd_id : {type: String, required: true},
    qty: {type: Number, required: true},
    prc: {type: Number, required: true}
  }],
  saleTxnId: {
    type: String,
    required: false
  },
},
{ timestamps: true }
);

// export model user with StockSchema
module.exports = mongoose.model("stock", StockSchema);