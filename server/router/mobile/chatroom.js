module.exports = (app) => {
    const chatSchema = require('../../models/chatModle')
    const midAuth = require('../../middleware/auth')
    const express = require('express')
    const router = express.Router()
    app.use('/api/mobile', router)

    router.post('/chatList', midAuth(), async (req, res) => {
        let {currentPage, pageSize} = req.body
        let chatList = await chatSchema.find().sort({time:-1}).skip((currentPage-1)*pageSize).limit(pageSize)
        chatList = chatList.sort()
        res.send({
            code:0,
            chatList
        })
    })
}