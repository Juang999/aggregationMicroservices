const axios = require('axios')
const orderMicroservice = 'http://192.168.56.1:3000'
const moment = require('moment')

const PlansController = {
    getPlan: (req, res) => {
        axios.get(`${orderMicroservice}/plans/get-plan`, {
            headers: {
                "authorization": req.get("authorization")
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "success to get data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data",
                    error: err.message
                })
        })
    },
    createUnplan: (req, res) => {
        axios.post(`${orderMicroservice}/plans/create-unplan`, {
            ptnr_id: req.body.ptnr_id,
            amount: req.body.amount,
            periode_code: req.body.periode_code
        },{
            headers: {
                "authorization": req.get("authorization")
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil membuat data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: "gagal membaut data",
                    error: err.message
                })
        })
    },
    getCustomerPerPeriode: (req, res) => {
        let periode = (req.query.periode) ? req.query.periode : moment().format('YYYYMM')

        axios.get(`${orderMicroservice}/plans/customer-per-periode?periode=${periode}`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil data kostumer per-periode",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data kostumer per-periode",
                    error: err.message
                })
        })
    }
}

module.exports = PlansController