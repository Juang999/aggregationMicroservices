const axios = require('axios')
const orderMicroservice = 'http://192.168.8.128:3000'

const MasterController = {
    getPeriode: (req, res) => {
        axios.get(`${orderMicroservice}/master/periode`, {
            headers: {
                "authorization": req.get("authorization")
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "failed to get data",
                    error: err.message
                })
        })
    },
    getPeriodeSales: (req, res) => {
        axios.get(`${orderMicroservice}/master/periode-customer`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "success",
                    message: "berhasil mengambil data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "failed",
                    message: "gagal mengambil data",
                    data: err.message
                })
        })
    }
}

module.exports = MasterController