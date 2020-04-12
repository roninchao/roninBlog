const mongoose = require('mongoose')
// 创建Schema对象
const chatSchema = new mongoose.Schema({
    name:{
        type:String
    },
    nameId:{
        type:mongoose.SchemaTypes.ObjectId, ref:"users",
    },
    content:{
        type:String
    },
    time:{
        type:String
    }
    
})
//把Schema对象转化为数据模型并导出
module.exports = mongoose.model('chat', chatSchema)