const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{type:String},
    category:{type: mongoose.SchemaTypes.ObjectId,ref:"category"},
    desc:{type:String},
    content:{type:String},
    visits:{type:Number},
    comments:{type:Number},
    time:{type:String}
})

module.exports = mongoose.model('article', articleSchema)