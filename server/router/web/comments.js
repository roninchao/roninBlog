module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const commentSchema = require('../../models/commentModel')
    const midAuth = require('../../middleware/auth')
    app.use('/api/web', router)
    // 发表评论
    router.post('/comments', midAuth(), async(req, res) => {
        let {articleId, reviewerId, commentatorId, content} = req.body
        let time = new Date().getTime()
        if(commentatorId){
            await commentSchema.create({articleId, reviewerId, commentatorId, content, time})
        }else{
            await commentSchema.create({articleId, reviewerId, content, time})
        }
        res.send({
            code:0,
            message:"发表成功"
        })
    })
    //获取评论列表
    router.post('/getCommentList', midAuth(), async(req, res) => {
        let data = await commentSchema.find().populate('reviewerId', 'commentatorId')
        console.log(data)
    })
}