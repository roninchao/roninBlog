module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const midAuth = require('../../middleware/auth')
    const articleSchema = require('../../models/articleModel')
    const commentSchema = require('../../models/commentModel')
    const categorySchema = require('../../models/categoryModel')
    const usersSchema = require('../../models/usersModel')
    app.use('/api/admin/', router)

    router.get('/statistics', midAuth(), async (req, res) =>{
        let data = {}
        //文章总数
        let allArticle = await articleSchema.countDocuments()
        //评论总数
        let allComments = await commentSchema.countDocuments()
        //用户总数
        let allUsers = await usersSchema.countDocuments({auth:0})
        data.allArticle = allArticle
        data.allComments = allComments
        data.allUsers = allUsers
        //每个分类文章数        
        let category = await categorySchema.find()
        data.category = []
        for(let key of category){
            let count =  await articleSchema.countDocuments({category:key._id})
            data.category.push({category:key.category, count:count})
        }
        res.send({
            code:0,
            data:data
        })
    })
}