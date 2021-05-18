const mongoose = require("mongoose");
const { schema } = require("./user");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    title: String,
    description: String,
    photo: String,
    price: Number,

});

module.exports = mongoose.model('Product', ProductSchema);

