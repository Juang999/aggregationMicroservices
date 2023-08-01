const microservice = require('../../../../config/microservice')
const ordermicroservice = microservice.ordermicroservice
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const VisitController = {
    getVisitSchedule: (req, res) => {
        let paramPeriode = (req.query.periode) ? req.query.periode : ''
        let status = (req.query.status == 1) ? 'Y' : 'N'

        axios.get(`${ordermicroservice}/visit/visitation?periode=${paramPeriode}&status=${status}`, {
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
            return
            res.status(400)
                .json({
                    status: "gagal",
                    error: err.response.data.error
                })
        })
    },
    getDetailVisitSchedule: (req, res) => {
        axios.get(`${ordermicroservice}/visit/visitation/${req.params.visit_code}/visitation_schedule`, {
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
                    data: err.response.data.error
                })
        })
    },
    getDetailVisit: (req, res) => {
        axios.get(`${ordermicroservice}/visit/visitation/${req.params.visited_oid}/visitation_detail`, {
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
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal mengambil data etail kunjungan",
                    error: err.response.data.error
                })
        })
    },
    createScheduleVisit: (req, res) => {
        axios.post(`${ordermicroservice}/visit/visitation`, {
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
        axios.post(`${ordermicroservice}/visit/visitation/customer`, {
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
                    status: err.response.data.status,
                    message: "gagal menambahkan orang yang akan dikunjungi",
                    error: err.response.data.error
                })
        })
    },
    checkIn: (req, res) => {
        let formData = new FormData()

        axios.patch(`${ordermicroservice}/visit/visitation/${req.params.visited_oid}/checkin`, {
            visit_code: req.body.visit_code,
            checkin_lat: req.body.lat_checkin,
            checkin_long: req.body.long_checkin,
            checkin_address: req.body.address_checkin,
            file: JSON.stringify(req.files.file),
            objective: req.body.objective_checkin
        }, {
            headers: {
                'authorization': req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: result.data.status,
                    message: result.data.message
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "gagal",
                    message: err.response.data.message,
                    error: err.response.data.error,
                    visited_oid: err.response.data.visited_oid
                })
        })
    },
    checkOut: (req, res) => {
        axios.patch(`${ordermicroservice}/visit/visitation/${req.params.visited_oid}/checkout`, {
            checkout_lat: req.body.lat_checkout,
            checkout_long: req.body.long_checkout,
            checkout_address: req.body.address_checkout,
            result: req.body.result_checkout,
            output: req.body.output_checkout
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
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal checkout",
                    error: err.response.data.error
                })
        })
    },
    deleteFromListSchedule: (req, res) => {
        axios.delete(`${ordermicroservice}/visit/visitation/customer/${req.params.visited_oid}/delete`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "berhasil",
                    message: "berhasil menghapus data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal menghapus data",
                    error: err.message
                })
        })
    },
    deleteSchedule: (req, res) => {
        axios.delete(`${ordermicroservice}/visit/visitation/${req.params.visit_code}/delete`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: "berhasil",
                    message: "berhasil menghapus data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal menghapus data",
                    error: err.message
                })
        })
    },
    getCustomerPerPeriode: (req, res) => {
        axios.get(`${ordermicroservice}/visit/visitation/customer/per-periode`, {
            headers: {
                'authorization': req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: "berhasil mengambil data",
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: "gagal",
                    message: "gagal mengambil data",
                    error: err.response.data.message
                })
        })
    },
    getVisitType: (req, res) => {
        axios.get(`${ordermicroservice}/visit/visitation/type`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: 'berhasil mengambil data',
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal mmengambil data',
                    error: err.response.data.error
                })
        })
    },
    getOutputVisitType: (req, res) => {
        axios.get(`${ordermicroservice}/visit/visitation/output`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: 'berhasil mengambil data',
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal mengambil data',
                    error: err.response.data
                })
        })
    },
    getSalesPerPeriode: (req, res) => {
        let search = (req.query.search) ? req.query.search : ''

        axios.get(`${ordermicroservice}/visit/visitation/${req.params.periode}/sales?search=${search}`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })
            .then(result => {
                res.status(200)
                    .json({
                        status: 'success!',
                        data: result.data.data,
                        error: null
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: err.response.data.status,
                        data: null,
                        error: err.response.data.error
                    })
            })
    }
}

module.exports = VisitController