const mongoose = require('mongoose')
// 用bcryptjs进行hash加密
const bcrypt = require('bcryptjs')
// 创建Schema对象
const usersSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String,
        //select设置是否返回该字段
        select:false, 
        //set在数据存储前进行操作
        set(val){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(val, salt);
            return hash
        }
    },
    auth:{
        type:Number
    },
    avatar:{
        type:String
    },
    sex:{
        type:Number
    },
    ability:{
        type:Array
    },
    birthday:{
        type:String
    },
    address:{
        type:Array
    },
    tel:{
        type:String
    },
    email:{
        type:String
    },
})
//把Schema对象转化为数据模型并导出
module.exports = mongoose.model('users', usersSchema)