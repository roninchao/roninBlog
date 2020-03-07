module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const usersSchema = require('../../models/usersModel')
    const midAuth = require('../../middleware/auth')
    app.use('/api/admin', router)
    //新增用户
    router.post('/users', midAuth(), async (req, res) => {
        // console.log(req.body)
        let {username, password, auth} = req.body
        let user = await usersSchema.findOne({username})
        if(user) return res.status(422).send({
            code:-1,
            message:'该用户已经被注册'
        })
        let item = await usersSchema.create({username, password, auth})
        res.send({
            code:0,
            message:'添加成功'
        })
    })
    //删除用户
    router.delete('/users/:id', midAuth(), async (req, res) => {
        await usersSchema.findByIdAndRemove(req.params.id)
        res.send({
            code:0,
            message:"删除成功"
        })
    })
    //修改用户
    router.put('/users/:id', midAuth(), async (req, res) => {
        let {username, password, auth} = req.body
        console.log(req.params.id,{username, password, auth})
        await usersSchema.findByIdAndUpdate(req.params.id,{username, password, auth})
        res.send({
            code:0,
            message:"修改成功"
        })
    })
    // 分页查找用户
    router.post('/users/getList', midAuth(), async (req, res) => {
        let {currentPage, pageSize} = req.body
        //获取数据总数
        let total = await usersSchema.countDocuments()
        //skip表示跳过数据
        let data = await usersSchema.find().skip((currentPage-1)*pageSize).limit(pageSize)
        res.send({
            code:0,
            data,
            total
        })
    })
    //模糊查询
    router.post('/users/search', midAuth(), async (req, res) => {
        let {search, currentPage, pageSize} = req.body
        //获取数据总数
        let total = await usersSchema.countDocuments({username:new RegExp(search)})
        //skip表示跳过数据
        let data = await usersSchema.find({username:new RegExp(search)}).skip((currentPage-1)*pageSize).limit(pageSize)
        res.send({
            code:0,
            data,
            total
        })
    })
    //根据ID查找用户
    router.get('/users/:id', midAuth(), async (req, res) => {
        let data = await usersSchema.findById(req.params.id)
        res.send({
            code:0,
            data
        })
    })
}