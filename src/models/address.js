const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  country: String,
  fullName: String,
  streetAddress: String,
  city: String,
  zupanija: String,
  zipCode: Number,
  phoneNumber: String,
});

module.exports = mongoose.model("Address", AddressSchema);
