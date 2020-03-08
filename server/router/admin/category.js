module.exports = app => {
    const express = require('express')
    const router  = express.Router()
    const categorySchema = require('../../models/categoryModel')
    const articleSchema = require('../../models/articleModel')
    const midAuth = require('../../middleware/auth')
    app.use('/api/admin', router)
    //新增分类
    router.post('/category', midAuth(), async (req, res) =>{
        let {category} = req.body
        let isValid = await categorySchema.findOne({category})
        if(isValid) return res.status(422).send({
            code:-1,
            message:"已经存在该分类"
        })
        let data = await categorySchema.create({category})
        res.send({
            code:0,
            message:"分类添加成功"
        })
    })
    //删除分类
    router.delete('/category/:id', midAuth(), async (req, res) =>{
        let isValid = await articleSchema.countDocuments({category: req.params.id})
        if(isValid) return res.status('422').send({
            code:-1,
            message:'该分类含有关联的文章，禁止删除'
        })
        await categorySchema.findByIdAndRemove(req.params.id)
        res.send({
            code:0,
            message:"分类删除成功"
        })
    })
    //修改分类
    router.put('/category', midAuth(), async (req, res) =>{
        let {id,category} = req.body
        let data = await categorySchema.findByIdAndUpdate(id, {category})
        res.send({
            code:0,
            message:"分类修改成功"
        })
    })
    //查找分类
    router.get('/category', midAuth(), async (req, res) =>{
        let data = await categorySchema.find()
        res.send({
            code:0,
            data
        })
    })
    //根据ID查找分类
    router.get('/category/:id', midAuth(), async (req, res) =>{
        let data = await categorySchema.findById(req.params.id)
        res.send({
            code:0,
            data
        })
    })
}