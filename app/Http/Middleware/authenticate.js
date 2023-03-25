require('dotenv').config()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const orderMicroservice = 'http://192.168.8.128:3000'

const authenticate = (req, res, next) => {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        res.status(400)
            .json({
                message: 'unauthorize'
            })

        return
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            res.sendStatus(403)
            return
        }

        let data = await axios.post(orderMicroservice+'/users/authenticate', {
            username: user.name,
            password: user.security_word
        })

        if (data.data.result != true) {
            res.status(403)
                .json({
                    message: "unautohorize"
                })

        return
        }

        next()
    })
}

module.exports = authenticate