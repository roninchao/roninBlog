module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '../../../uploads', })
    const midAuth = require('../../middleware/auth')
    app.use('/api/admin', router)

    router.post('/uploadImage', midAuth(), upload.single('file'),async (req, res) => {
        const file = req.file
        // let location = file.mimetype.indexOf('/')+1
        // let ext = file.mimetype.substr(location)
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}