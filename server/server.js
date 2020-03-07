const express = require('express')
const app = express()
const path = require('path')
//使用cors跨域
const cors = require('cors')
app.use(cors())
//解析请求体
app.use(express.json())
//向mongoDB传递app
require('./plugins/db')(app)
//向路由传递app
require('./router/admin/users')(app)
require('./router/admin/login')(app)
require('./router/admin/category')(app)
require('./router/admin/article')(app)
//全局变量
app.set('secret', '234d22f33f0ec7a4babb0e610ba6c57fa0e3e557d1fd2358a2600cf1cc55d9c4')
//监听
app.listen(3000,() => {
    console.log('server open')
})