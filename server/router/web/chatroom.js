module.exports = (app, socketIo) => {
    const jwt = require('jsonwebtoken');
    const usersSchema = require('../../models/usersModel')
    const chatSchema = require('../../models/chatModle')
    const express = require('express')
    const router = express.Router()
    app.use('/api/web', router)

    router.get('/chatList', async (req, res) => {
        let chatList = await chatSchema.find()
        res.send({
            code:0,
            chatList
        })
    })
    // let onlineList = []
    // router.post('/onlineList', (req, res) => {
    //     let {userId, username, e} = req.body
    //     let i = onlineList.findIndex((item ,index) => {
    //         return item.userId == userId
    //     })
    //     if(e){
    //         if(i == -1){
    //             onlineList.push({userId,username})
    //         }
    //     }else{
    //         onlineList.splice(i,1)
    //     }
    //     res.send({
    //         code:0
    //     })
    // })
    let count = 0
    router.get('/online', (req, res) => {
        res.send({
            code:0,
            count
        })
    })
    socketIo.on('connection',function(client){
        count++
         // 在线人数
        socketIo.emit('online', {count:count});
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
            await chatSchema.create({name,nameId,content,time})
            //向客户端广播数据
            socketIo.emit('notice', {name,nameId,content,time});
        });
        // 客户端断开连接
        client.on('close', () => {
            console.log("断开连接");
            count--
            socketIo.emit('online', {count});
        });
    });
}