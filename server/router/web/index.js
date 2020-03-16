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
    // router.get('/article', async (req, res) => {
    //     let articleList = await articleSchema.find().populate('category')
    //     res.send({
    //         code:0,
    //         articleList
    //     }) 
    // })
    router.post('/article', async (req, res) => {
        let {id} = req.body
        let articleList = []
        if(id){
            articleList = await articleSchema.find({category:id}).populate('category')
        }else{
            articleList = await articleSchema.find().populate('category')
        }
        res.send({
            code:0,
            articleList
        }) 
    })
    router.get('/article/:id', async (req, res) => {
        let article = await articleSchema.findById(req.params.id).populate('category')
        let visits = article.visits + 1
        await articleSchema.findByIdAndUpdate(req.params.id, {visits})
        res.send({
            code:0,
            article
        }) 
    })
}