const mongoose = require('mongoose');

const adPictureSchema = mongoose.Schema({
    ad_pic : String,
    ad_text: String,
    updated_at : {type: Date, default: Date.now }
})
module.exports = mongoose.model('adBox', adPictureSchema)