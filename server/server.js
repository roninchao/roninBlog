const express = require('express')
const app = express()
const path = require('path')
// 引入http模块
const http = require('http');
// 用http模块创建一个服务并把express的实例挂载上去
const server = http.Server(app);
// 引入socket.io并立即实例化，把server挂载上去
const socketIo = require('socket.io')(server);
//使用cors跨域
const cors = require('cors')
app.use(cors())
//解析请求体
app.use(express.json())
//向mongoDB传递app
require('./plugins/db')(app)
//向路由传递app -- admin
require('./router/admin/users')(app)
require('./router/admin/login')(app)
require('./router/admin/category')(app)
require('./router/admin/article')(app)
require('./router/admin/upload')(app)
require('./router/admin/statistics')(app)
//向路由传递app -- web
require('./router/web/index')(app)
require('./router/web/users')(app)
require('./router/web/comments')(app)
require('./router/web/chatroom')(app, socketIo)
require('./router/web/upload')(app)

//全局变量
app.set('secret', '234d22f33f0ec7a4babb0e610ba6c57fa0e3e557d1fd2358a2600cf1cc55d9c4')
//静态资源目录
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// 端口
const port = 3000
//监听
server.listen(port, () => {
    console.log('服务器已开启,http://localhost:'+ port);
});