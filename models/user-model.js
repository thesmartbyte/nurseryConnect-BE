const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
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
  nurseryId: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
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

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);