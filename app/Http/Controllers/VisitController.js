const ordermicroservice = 'http://192.168.8.128:3000'
const axios = require('axios')

const VisitController = {
    getVisitSchedule: (req, res) => {
        axios.get(`${ordermicroservice}/visit/get-visiting-schedule`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: "berhasil mengambil data jadwal kunjungan",
                    data: result.data.data
                })
        }).catch(err => {
            console.log(err)
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal mengambil data jadwal kunjungan",
                    error: err.message
                })
        })
    },
    getDetailVisitSchedule: (req, res) => {
        axios.get(`${ordermicroservice}/visit/get-detail-visiting-schedule/${req.params.visit_code}`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: result.data.status,
                    message: result.data.message,
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal mengambil detail data",
                    data: err.message
                })
        })
    },
    getDetailVisit: (req, res) => {
        axios.get(`${ordermicroservice}/visit/get-detail-visiting/${req.params.visited_oid}`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "berhasil",
                    message: "berhasil mengambil data detail kunjungan",
                    data: result.data.data
                })
        }).catch(err => {
            console.log(err)
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal mengambil data etail kunjungan",
                    error: err.message
                })
        })
    }
}

module.exports = VisitController