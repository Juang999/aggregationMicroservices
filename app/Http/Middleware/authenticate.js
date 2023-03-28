require('dotenv').config()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const orderMicroservice = 'http://192.168.8.128:3000'
const key = "Aggregation Microservice1"
const CryptoJS = require('crypto-js')

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

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403)
            return
        }
        
        axios.post(`${orderMicroservice}/users/authenticate`, {
            accessToken: user.token,
            secret_key: user.secret_key
        }).then(result => {
            if (result.data.result == true) {
                next()
            }
        }).catch(err => {
            res.status(400)
                .json({
                    status: err.response.data.result,
                    message: err.response.data.message
                })
        })
    })
}

module.exports = authenticate