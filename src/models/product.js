const mongoose = require("mongoose");
const mongooseAlgolia = require("mongoose-algolia");
const { schema } = require("./user");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    title: String,
    description: String,
    photo: String,
    price: Number,

});

ProductSchema.plugin(mongooseAlgolia, {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_SECRET,
    indexName: process.env.ALGOLIA_INDEX,
  
    selector: "title _id photo description price",
   
    debug: true
  });
  
 // let Model = mongoose.model("Product", ProductSchema);
  //Model.SyncToAlgolia();
  //Model.SetAlgoliaSettings({
   // searchableAttributes: ["title"]
  //});
  

//module.exports = Model;

