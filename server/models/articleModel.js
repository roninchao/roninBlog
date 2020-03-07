const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{type:String},
    category:{type: mongoose.SchemaTypes.ObjectId,ref:"category"},
    content:{type:String},
    time:{type:String}
})

module.exports = mongoose.model('article', articleSchema)