const microservice = require('../../../config/microservice')
const ordermicroservice = microservice.ordermicroservice
const axios = require('axios')

const SalesQuotationController = {
    getSite: (req, res) => {
        axios.get(`${ordermicroservice}/sales-quotation/get-site`, {
            headers: {
                "authorization": req.get('authorization')
            }
        })
            .then(result => {
                res.status(200)
                    .json({
                        status: 'berhasil',
                        message: 'berhasil mengambil data',
                        data: result.data.data
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(400)
                    .json({
                        status: 'gagal',
                        message: 'gagal mengambil data',
                        error: err.message
                    })
            })
    },
    getLocation: (req, res) => {
        axios.get(`${ordermicroservice}/sales-quotation/get-location`, {
            headers: {
                "authorization": req.get('authorization')
            }
        })
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
    getLocationTo: (req, res) => {
        axios.get(`${ordermicroservice}/sales-quotation/get-location`, {
            headers: {
                "authorization": req.get('authorization')
            }
        })
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
    getLocationGit: (req, res) => {
        axios.get(`${ordermicroservice}/sales-quotation/get-location-git`, {
            headers: {
                "authorization": req.get('authorization')
            }
        })
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
    getSalesQuotation: (req, res) => {
        axios.get(`${ordermicroservice}/sales-quotation/get-sales-quotation`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: 'berhasil mengambil data sales quotation',
                    sales_quotation_history: result.data.sales_quotation_history
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal mengambil data sales quotation',
                    error: err.message
                })
        })
    }
}

module.exports = SalesQuotationController