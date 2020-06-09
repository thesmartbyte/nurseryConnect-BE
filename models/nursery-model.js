const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NurserySchema = Schema({
  name: {
    type: String,
    required: true
  },
  adrsln1: {
    type: String,
    required: true
  },
  adrsln2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gstNo: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  }
},
{ timestamps: true }
);

// export model user with NurserySchema
module.exports = mongoose.model("nursery", NurserySchema);