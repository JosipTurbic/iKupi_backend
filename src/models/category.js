const mongoose = require("mongoose");
const { schema } = require("./user");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    type: {type: String,unique: true, required: true}
  

});

module.exports = mongoose.model('Category', CategorySchema);
