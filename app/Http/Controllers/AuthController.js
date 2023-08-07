require('dotenv').config()
const axios = require('axios')
const microservice = require('../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const key = "Aggregation Microservice"

let AuthController = {
    login: (req, res) => {
        axios.post(orderMicroservice+'/users/login', {
            username: req.body.username,
            password: req.body.password
        })
        .then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil login",
                    token: result.data.data
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal login",
                    error: err.response.data.error
                })
        })
    },
    profile: (req, res) => {
        axios.get(`${orderMicroservice}/users/profile`, {
            headers: {
                "authorization": req.get("authorization")
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil profile",
                    data: result.data.data
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data profile",
                    err: err.message
                })
        })
    },
    adminLogin: (req, res) => {
        axios.post(`${orderMicroservice}/users/admin-login`, {
            username: req.body.username,
            password: req.body.password
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success!',
                    token: result.data.token,
                    error: null,
                    expired: 60 * 24
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: err.response.data.status,
                    token:null,
                    error: err.response.data.error
                })
        })
    },
    AdminProfile: (req, res) => {
        axios.get(`${orderMicroservice}/users/admin-profile`, {
            headers: {
                "authorization": req.get('authorization')
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    code: 200,
                    status: 'success!',
                    data: result.data.data,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    code: 400,
                    status: err.response.data.status,
                    data: null,
                    error: err.response.data.error
                })
        })
    }
}

module.exports = AuthController