require('dotenv').config()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const orderMicroservice = 'http://192.168.56.1:3000'
const key = "Aggregation Microservice1"
const CryptoJS = require('crypto-js')

const authenticate = (req, res, next) => {
    let authHeader = req.headers['authorization']
    if (authHeader == null) {
        res.status(400)
            .json({
                message: 'unauthorize'
            })

        return
    }
    
    axios.post(`${orderMicroservice}/users/authenticate`, {
        token: authHeader
    }, {
        headers: {
            "authorization": authHeader
        }
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
}

module.exports = authenticate