const axios = require('axios')
const { response } = require('express')
const { or } = require('sequelize')
const microservice = require('../../../config/microservice')
const orderMicroservice = microservice.ordermicroservice

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
    },
    getTaxInvoice: (req, res) => {
        axios.get(`${orderMicroservice}/master/tax_invoice`, {
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
                    error: err.message
                })
        })
    },
    getAddrType: (req, res) => {
        axios.get(`${orderMicroservice}/master/addr_type`, {
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
                    message: "gagal mengambil data",
                    error: err.message
                })
        })
    },
    getContactPerson: (req, res) => {
        axios.get(`${orderMicroservice}/master/contact_person`, {
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
                    message: "gagal mengmbil data",
                    error: err.message
                })
        })
    },
    getBpType: (req, res) => {
        axios.get(`${orderMicroservice}/master/bp_type`, {
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
                    error: err.message
                })
        })
    },
    getCitizen: (req, res) => {
        axios.get(`${orderMicroservice}/master/citizen`, {
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
                    error: err.message
                })
        })
    },
    getBloodGroup: (req, res) => {
        axios.get(`${orderMicroservice}/master/blood_group`, {
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
                    status: 'failed',
                    message: 'gagal mengambil data',
                    error: err.message
                })
        })
    },
    getGender: (req, res) => {
        axios.get(`${orderMicroservice}/master/gender`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: 'success',
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
    },
    getCurrency: (req, res) => {
        axios.get(`${orderMicroservice}/master/currency`, {
            headers: {
                'authorization': req.get('authorization')
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
                    status: 'failed',
                    message: "gagal mengmabil data",
                    error: err.message
                })
        })
    },
    getEntity: (req, res) => {
        axios.get(`${orderMicroservice}/master/entity`, {
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
                    status: 'failed',
                    messsage: "gagal mengambil data",
                    error: err.message
                })
        })
    },
    getDefaultPeriode: (req, res) => {
        axios.get(`${orderMicroservice}/master/default-periode`)
            .then(result => {
                res.status(200)
                    .json({
                        status: 'berhasil',
                        message: "berhasil mengambil data",
                        date: result.data.data
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(400)
                    .json({
                        status: "gagal",
                        message: "gagal mengambil data default periode",
                        error: err.message
                    })
            })
    },
    getLocation: (req, res) => {
        axios.get(`${orderMicroservice}/master/get-location`)
            .then(result => {
                res.status(200)
                    .json({
                        status: 'berhasil',
                        message: 'berhasil mengambil data barang',
                        data: result.data.data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'gagal',
                        message: 'gagal mengambil data barang',
                        error: err.message
                    })
            })
    },
    getPaymentType: (req, res) => {
        axios.get(`${orderMicroservice}/master/get-payment-type`)
            .then(result => {
                res.status(200)
                    .json({
                        status: 'berhasil',
                        message: 'berhasil mengambil data',
                        data: result.data.data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'gagal',
                        message: 'gagal mengambil data',
                        err: err.message
                    })
            })
    },
    getPaymentMethod: (req, res) => {
        axios.get(`${orderMicroservice}/master/get-payment-method`)
            .then(result => {
                res.status(200)
                    .json({
                        status: 'berhasil',
                        message: 'berhasil mengambil data',
                        data: result.data.data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'gagal',
                        message: 'gagal mengambil data',
                        error: err.message
                    })
            })
    },
    getCreditTermsMstr: (req, res) => {
        axios.get(`${orderMicroservice}/master/get-creditterms-mstr`)
            .then(result => {
                res.status(200)
                    .json({
                        status: 'berhasil',
                        message: 'berhasil mengambil data',
                        data: result.data.data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'gagal',
                        message: 'gagal mengambil data',
                        error: err.message
                    })
            })
    }
}

module.exports = MasterController