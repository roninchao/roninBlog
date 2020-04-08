module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const categorySchema = require('../../models/categoryModel')
    const articleSchema = require('../../models/articleModel')
    app.use('/api/web', router)
    //获取分类列表
    router.get('/category', async (req, res) => {
        let cate = await categorySchema.find()
        res.send({
            code:0,
            cate
        }) 
    })
    //获取热评排行榜
    router.get('/commentsRanking', async (req, res) => {
        let commentsRanking = []
        await articleSchema.find({}).sort({comments:-1}).limit(10).exec(function(err,docs){
            commentsRanking = docs
            res.send({
                code:0,
                commentsRanking
            }) 
        });
    })
    //获取新增排行榜
    router.get('/newRanking', async (req, res) => {
        let newRanking = []
        await articleSchema.find({}).sort({time:-1}).limit(10).exec(function(err,docs){
            newRanking = docs
            res.send({
                code:0,
                newRanking
            }) 
        });
    })
    // 获取轮播图
    router.get('/swiper', async (req, res) => {
        let swiper = []
        await articleSchema.find({}).sort({visits:-1}).limit(4).exec(function(err,docs){
            swiper = docs
            res.send({
                code:0,
                swiper
            }) 
        });
    })
    //获取文章列表
    router.post('/articleList', async (req, res) => {
        let {id, currentPage, pageSize} = req.body
        let articleList = []
        if(!id == 0){
            articleList = await articleSchema.find({category:id}).populate('category').skip((currentPage-1)*pageSize).limit(pageSize)
        }else{
            articleList = await articleSchema.find().populate('category').skip((currentPage-1)*pageSize).limit(pageSize)
        }   
        res.send({
            code:0,
            articleList
        }) 
    })
    //搜索文章
    router.post('/search', async (req, res) => {
        let {search, currentPage, pageSize} = req.body
        //skip表示跳过数据
        let articleList = await articleSchema.find({title:new RegExp(search)}).populate('category').skip((currentPage-1)*pageSize).limit(pageSize)
        res.send({
            code:0,
            articleList
        }) 
    })
    //文章详情
    router.post('/article', async (req, res) => {
        // next=1 表示下一篇 -1表示上一篇  0表示根据ID取得文章 
        let {id ,next} = req.body
        let article = {}
        article = await articleSchema.findById(id).populate('category')
        if(next != 0){
            let articleList = await articleSchema.find().populate('category')
            articleList.forEach((item, index)=> {
                if(item._id == id){
                    let i = index+next;
                    if(index+next<0){
                        i = articleList.length -1
                    }
                    if(index+next > articleList.length-1){
                        i = 0
                    }    
                    article = articleList[i]
                }
            })
        }
        let visits = article.visits + 1
        await articleSchema.findByIdAndUpdate(article._id, {visits})
        res.send({
            code:0,
            article
        }) 
    })
}