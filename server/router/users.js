module.exports = app => {
    const express = require('express')
    const router = express.Router()
    //解析json
    const bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({ extended: false}))
    const usersSchema = require('../models/usersModel')
    app.use('/api/admin/users', router)
    //新增用户
    router.post('/', async (req, res) => {
        let {username, password} = req.body
        let user = await usersSchema.findOne({username})
        if(user) return res.status(422).send({
            code:-1,
            message:'该用户名已经被注册'
        })
        let item = await usersSchema.create({username, password})
        res.send({
            code:0,
            message:'添加成功'
        })
    })
}