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
    },
    createScheduleVisit: (req, res) => {
        axios.post(`${ordermicroservice}/visit/create-schedule`, {
            start_date: req.body.start_date,
            end_date: req.body.end_date
        }, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "berhasil",
                    message: "berhasil membuat jadwal kunjungan",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(200)
                .json({
                    status: "gagal",
                    message: "gagal membuat jadwal kunjungan",
                    error: err.message
                })
        })
    },
    createPeopleToVisit: (req, res) => {
        axios.post(`${ordermicroservice}/visit/create-list-customer-to-visit`, {
            visit_code: req.body.visit_code,
            type: req.body.type,
            ptnr_id: req.body.ptnr_id,
            cus_name: req.body.cus_name,
            cus_address: req.body.cus_address,
            cus_phone: req.body.cus_phone,
        }, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "berhasil",
                    mesage: "berhasil menambahkan orang yang akan dikunjungi",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal menambahkan orang yang akan dikunjungi",
                    error: err.message
                })
        })
    }
}

module.exports = VisitController