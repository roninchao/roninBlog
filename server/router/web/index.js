module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const categorySchema = require('../../models/categoryModel')
    const articleSchema = require('../../models/articleModel')
    app.use('/api/web', router)

    router.get('/category', async (req, res) => {
        let cate = await categorySchema.find()
        res.send({
            code:0,
            cate
        }) 
    })
    router.get('/article', async (req, res) => {
        let articleList = await articleSchema.find()
        res.send({
            code:0,
            articleList
        }) 
    })
    router.get('/article/:id', async (req, res) => {
        let article = await articleSchema.findById(req.params.id).populate('category')
        res.send({
            code:0,
            article
        }) 
    })
}