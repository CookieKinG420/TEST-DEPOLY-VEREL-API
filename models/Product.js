const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
prod_name : String,
prod_desc : String,
prod_price : Number,
prod_image : String,
updated_at : {type : Date, default: Date.now}
})
module.exports = mongoose.model('Product', ProductSchema)