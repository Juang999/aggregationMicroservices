const ordermicroservice = 'http://192.168.8.128:3000'
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const VisitController = {
    getVisitSchedule: (req, res) => {
        let paramPeriode = (req.query.periode) ? req.query.periode : ''

        axios.get(`${ordermicroservice}/visit/get-visiting-schedule?periode=${paramPeriode}`, {
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
    },
    checkIn: (req, res) => {
        let formData = new FormData()

        axios.patch(`${ordermicroservice}/visit/checkin/${req.params.visited_oid}`, {
            visit_code: req.body.visit_code,
            checkin_lat: req.body.lat_checkin,
            checkin_long: req.body.long_checkin,
            checkin_address: req.body.address_checkin,
            checkin_checkin: req.body.checkin_checkin,
            file: JSON.stringify(req.files.file)
        }, {
            headers: {
                'authorization': req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: result.data.status,
                    message: result.data.message,
                    data: result.data.data
                })
        }).catch(err => {
            console.log(err)
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal checkin",
                    error: err.message
                })
        })
    },
    checkOut: (req, res) => {
        console.log(req.body)
        axios.patch(`${ordermicroservice}/visit/checkout/${req.params.visited_oid}`, {
            visit_code: req.body.visit_code,
            checkout_lat: req.body.lat_checkout,
            checkout_long: req.body.long_checkout,
            checkout_address: req.body.address_checkout,
            checkout_checkout: req.body.checkout_checkout
        }, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "berhasil",
                    message: "berhasil checkout",
                    data: result.data.data
                })
        }).catch(err => {
            console.log(err)
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal checkout",
                    error: err.message
                })
        })
    }
}

module.exports = VisitController