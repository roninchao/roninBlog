module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const midAuth = require('../../middleware/auth')
    const articleSchema = require('../../models/articleModel')
    const categorySchema = require('../../models/categoryModel')
    app.use('/api/admin/', router)

    router.get('/statistics', midAuth(), async (req, res) =>{
        let data = {}
        //文章总数
        let allArticle = await articleSchema.countDocuments()
        data.allArticle = allArticle
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