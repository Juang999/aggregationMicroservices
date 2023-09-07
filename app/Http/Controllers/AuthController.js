require('dotenv').config()
const axios = require('axios')
const microservice = require('../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const key = "Aggregation Microservice"
const empservice = microservice.employeeservice

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
    profile: async (req, res) => {
        try {
            /*get data user*/ 
            let dataUser = await axios.get(`${orderMicroservice}/users/profile`, {
                headers: {
                    "authorization": req.get("authorization")
                }
            })
            let user = dataUser.data.data

            /*get data limit credit user*/
            let dataLimitCredit = await axios.get(`${orderMicroservice}/order-service/client/sales-quotation/partner/${dataUser.data.data.user_ptnr_id}/limit-credit`, {
                headers: {
                    'authorization': req.get('authorization')
                }
            })
            let limitCredit = dataLimitCredit.data.data

            user.image = (user.nik_id) ? `${empservice}/photo/${btoa(user.nik_id)}` : '-'
            user.limit_credit = limitCredit

            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil profile",
                    data: user
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data profile",
                    err: error.response.data.error
                })
        }
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
    },
    Logout: (req, res) => {
        axios.post(`${orderMicroservice}/users/logout`, {}, {
            headers: {
                "authorization": req.get('authorization')
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    code: 200,
                    status: 'success!',
                    logout: true,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    code: 400,
                    status: err.response.data.status,
                    logout: false,
                    error: err.response.data.error
                })
        })
    }
}

module.exports = AuthController