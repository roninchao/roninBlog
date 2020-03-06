const express = require('express')
const app = express()
const path = require('path')
//使用cors跨域
const cors = require('cors')
app.use(cors())
//向mongoDB传递app
require('./plugins/db')(app)
//向路由传递app
require('./router/admin/users')(app)
//监听
app.listen(3000,() => {
    console.log('server open')
})