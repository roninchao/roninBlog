module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const usersSchema = require('../../models/usersModel')
    const midAuth = require('../../middleware/auth')
    app.use('/api/admin/users', router)
    //新增用户
    router.post('/', midAuth(), async (req, res) => {
        console.log(req.body)
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
    // 查找用户
    router.get('/', midAuth(), async (req, res) => {
        let data = await usersSchema.find().limit(10)
        res.send({
            code:0,
            data
        })
    })
}