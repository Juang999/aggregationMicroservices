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
        axios.get(`${ordermicroservice}/sales-quotation/get-location-to`, {
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
        let pageGetSalesQuotation = (req.query.page) ? req.query.page : 1

        axios.get(`${ordermicroservice}/sales-quotation/get-sales-quotation?page=${pageGetSalesQuotation}`, {
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
    },
    getPriceList: (req, res) => {
        axios.get(`${ordermicroservice}/sales-quotation/get-price-list/partnergroupid/${req.params.partnerGroupId}`, {
            headers: {
                "authorization": req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: 'berhasil mengambil data list harga',
                    data: result.data.data
                })
        }).catch(err => {
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal mengambil data list harga',
                    error: err.message
                })
        })
    },
    createSalesQuotation: (req, res) => {
        axios.post(`${ordermicroservice}/sales-quotation/create-sales-quotation`, {
            sq_ptnr_id_sold: req.body.ptnr_id_sold,
            sq_pay_type: req.body.pay_type,
            sq_pay_method: req.body.pay_method,
            sq_close_date: req.body.close_date,
            sq_cu_id: req.body.cu_id,
            sq_trans_rmks: req.body.trans_mrks,
            sq_cons: req.body.cons,
            sq_total: req.body.total,
            sq_terbilang: req.body.terbilang,
            sq_need_date: req.body.need_date,
            sq_loc_id: req.body.loc_id,
            sq_loc_to_id: req.body.loc_to_id,
            sq_loc_git: req.body.loc_gt_id,
            sq_is_dropshipper: req.body.is_dropshipper,
            sq_ship_to: req.body.ship_to,
            sq_body_sales_quotation: req.body.body_sales_quotation
        }, {
            headers: {
                'authorization': req.get('authorization')
            }
        }).then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: 'berhasil membuat sales quotation',
                    data: result.data.data
                })
        }).catch(err => {
            console.log(err)
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal membuat sales quotation',
                    error: err.response.data.error
                })
        })
    },
    sumDebtCustomer: (req, res) => {
        axios.get(`${ordermicroservice}/sales-quotation/sum-debt-from-customer/ptnrid/${req.params.partnerId}`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: 'berhasil mengambil data hutang pengguna',
                    data: result.data.data
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal mengambil data hutang pengguna',
                    error: err.response.data.error
                })
        })
    },
    getLimitCreditCustomer: (req, res) => {
        axios.get(`${ordermicroservice}/sales-quotation/get-credit-limit-customer/ptnrid/${req.params.partnerId}`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'berhasil',
                    message: 'berhasil mengambil data batas kredit pengguna',
                    data: result.data.data
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal mengambil data batas kredit pengguna',
                    error: err.response.data.error
                })
        })
    }
}

module.exports = SalesQuotationController