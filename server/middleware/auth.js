
module.exports = options =>{
    //获取用户token中间件
    //对于需要登录，统一发送401状态码
    const jwt = require('jsonwebtoken');
    const usersSchema = require('../models/usersModel')
    return async (req, res, next) => {
        let token = String(req.headers.authriozation).split(':')[1]
        if(!token){
            return res.status(401).send({
                message:'请登录'
            })
        }
        let decoded = jwt.verify(token, req.app.get('secret'));
        if(!decoded){
            return res.status(401).send({
                message:'请登录'
            })
        }
        let user = await usersSchema.findById({_id:decoded.id}) 
        if(!user){
            return res.status(401).send({
                message:'请登录'
            })
        }
        await next()
    }
}