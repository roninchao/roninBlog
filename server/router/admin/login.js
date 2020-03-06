module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const usersSchema = require('../../models/usersModel')
    app.use('/api/admin/login', router)
    // 登录
    router.post('/', async(req, res) => {
        const {username, password} = req.body
        // select()会将默认不查的数据查找出来
        let user = await usersSchema.findOne({username}).select('+password')
        if(!user) return res.status(422).send({
            code:-1,
            message:'用户账号不存在'
        })
        if(user.auth !== 1) return res.status(422).send({
            code:-1,
            message:'用户没有权限'
        })
        //验证密码 bcrypt.compareSync(n1, n2) 表示要验证的数据，n2表示存储的hash密码
        let bcrypt = require('bcryptjs')
        let isValid = bcrypt.compareSync(password, user.password);
        if(isValid){
            //返回token,使用jsonwebtoken生成token
            let jwt = require('jsonwebtoken');
            //jwt.sign(n1,n2) 表示要token的数据，n2表示加密token秘钥
            let token = jwt.sign({ id: user._id}, app.get('secret'));
            res.send({
                code:0,
                message:'登录成功',
                data:{
                    userID:user._id,
                    username:user.username,
                    token:token
                }
            })
        }else{
            res.status(422).send({
                code:-1,
                message:'密码不正确',
            })
        }
    })
}