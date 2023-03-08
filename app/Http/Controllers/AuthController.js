require('dotenv').config()
const axios = require('axios')
const { validationResult } = require('express-validator')
const orderMicroservice = 'http://192.168.8.128:3000'
const jwt = require('jsonwebtoken')

let AuthController = {
    login: async (req, res) => {
        try {
            let errors = validationResult(req)

            if (!errors.isEmpty()) {
                res.status(300)
                    .json({
                        error: errors.array()
                    })

                return
            }

            let data = await axios.post(orderMicroservice+'/users/login', {
                username: req.body.username,
                password: req.body.password
            })

            const accessToken = jwt.sign(data.data.data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "24h"})

            res.status(200)
                .json({
                    status: "success",
                    messsage: "success to login",
                    tokenType: "Bearer",
                    token: accessToken
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "failed to login",
                    error: error.response.data
                })
        }
    }
}

module.exports = AuthController