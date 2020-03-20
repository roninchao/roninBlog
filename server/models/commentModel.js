const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    articleId:{type:mongoose.SchemaTypes.ObjectId, ref:"article"},
    reviewerId:{type:mongoose.SchemaTypes.ObjectId, ref:"users"},
    commentatorId:{type:mongoose.SchemaTypes.ObjectId, ref:"users"},
    time:{type:String},
    content:{type:String},
})

module.exports = mongoose.model('comments', commentSchema)