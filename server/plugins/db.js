module.exports = app => {
    const mongoose = require('mongoose');
    // 通过将useNewUrlParser设置为true来避免“不建议使用当前URL字符串解析器”警告
    mongoose.connect('mongodb://127.0.0.1:27017/roninBlog',{
        useNewUrlParser : true
    })
}