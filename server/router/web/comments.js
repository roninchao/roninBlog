module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const commentSchema = require('../../models/commentModel')
    const articleSchema = require('../../models/articleModel')
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
        let article = await articleSchema.findById(articleId)
        let comments = article.comments + 1
        await articleSchema.findByIdAndUpdate(articleId, {comments})
        res.send({
            code:0,
            message:"发表成功"
        })
    })
    //获取评论列表
    router.post('/commentList', async(req, res) => {
        let {articleId, currentPage, pageSize} = req.body
        //获取数据总数
        let total = await commentSchema.countDocuments({articleId})
        if(total <= 0) return res.send({
            code:0,
            message:'没有评论数据'
        })
        let data = await commentSchema.find({articleId}).populate(['reviewerId','commentatorId']).skip((currentPage-1)*pageSize).limit(pageSize)
        res.send({
            code:0,
            data,
            total
        })
    })
}