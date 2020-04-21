module.exports = (app, socketIo) => {
    const jwt = require('jsonwebtoken');
    const usersSchema = require('../models/usersModel')
    const chatSchema = require('../models/chatModle')
    socketIo.on('connection',function(client){
        //接收客户端传过来的数据
        client.on('message',async (data) => {
            let token = data.token
            if(!token){
                return res.status(401).send({
                    message:'请登录'
                })
            }
            let decoded = jwt.verify(token, app.get('secret'));
            if(!decoded){
                return res.status(401).send({
                    message:'请登录'
                })
            }
            let user = await usersSchema.findById({_id:decoded.id}) 
            if(!user){
                return res.status(401).send({
                    message:'请登录'
                })
            }
            let time = new Date().getTime(),
                name = user.username,
                nameId = user._id,
                content = data.val
            let {avatar} = await usersSchema.findOne({_id:nameId})
            await chatSchema.create({name,nameId,avatar,content,time})
            //向客户端广播数据
            console.log(content)
            socketIo.emit('notice', {name,nameId,avatar,content,time});
        });
        // 客户端断开连接
        client.on('close', () => {
            console.log("断开连接");
        });
    });
}
