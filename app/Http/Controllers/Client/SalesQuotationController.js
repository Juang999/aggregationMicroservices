const microservice = require('../../../../config/microservice')
const ordermicroservice = microservice.ordermicroservice
const productknowledgemicroservice = microservice.productknowledgemicroservice
const axios = require('axios')

class SalesQuotationController {
    getSite = (req, res) => {
        axios.get(`${ordermicroservice}/order-service/client/sales-quotation/site`, {
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
                        error: err.response.data.err
                    })
            })
    }

    getLocation = (req, res) => {
        axios.get(`${ordermicroservice}/order-service/client/sales-quotation/${req.params.en_id}/location`, {
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
    }

    getSalesQuotation = (req, res) => {
        let pageGetSalesQuotation = (req.query.page) ? req.query.page : 1

        axios.get(`${ordermicroservice}/order-service/client/sales-quotation/?page=${pageGetSalesQuotation}`, {
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

    getPriceList = (req, res) => {
        axios.get(`${ordermicroservice}/order-service/client/sales-quotation/price-list/${req.params.partnerGroupId}/group`, {
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
    }

    createSalesQuotation = (req, res) => {
        axios.post(`${ordermicroservice}/order-service/client/sales-quotation/`, {
            sq_ptnr_id_sold: req.body.ptnr_id_sold,
            sq_pay_type: req.body.pay_type,
            sq_pay_method: req.body.pay_method,
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
            sq_start_date: req.body.start_date,
            sq_end_date: req.body.end_date,
            sq_credit_term: req.body.credit_term,
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
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal membuat sales quotation',
                    error: err.response.data.error
                })
        })
    }

    sumDebtCustomer = (req, res) => {
        axios.get(`${ordermicroservice}/order-service/client/sales-quotation/partner/${req.params.partnerId}/debt`, {
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
    }

    getLimitCreditCustomer = (req, res) => {
        axios.get(`${ordermicroservice}/order-service/client/sales-quotation/partner/${req.params.partnerId}/limit-credit`, {
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

    getProductForSQ = async (req, res) => {
        try {
            let pageProduct = (req.query.page) ? req.query.page : 1
            let searchQuery = req.query.query
            let package_oid = req.query.package_oid
            let pricelistoid = req.params.priceListOid
            let limitPage = (req.query.limit) ? req.query.limit : 10

            let dataProductSalesQuotation

            if (req.query.is_package == 'Y') {
                dataProductSalesQuotation = await axios.get(`${ordermicroservice}/order-service/client/sales-quotation/package/${package_oid}/detail?price_oid=${pricelistoid}&page=${pageProduct}&limit=${limitPage}`, {
                    headers: {
                        authorization: req.headers['authorization']
                    }
                })
            } else {
                dataProductSalesQuotation = await axios.get(`${ordermicroservice}/order-service/client/sales-quotation/product/pricelist/${pricelistoid}/area/${req.params.areaId}/locationid/${req.params.locId}?page=${pageProduct}&query=${searchQuery}`, {
                    headers: {
                        'authorization': req.get('authorization')
                    }
                })
            }


            for (const dataProduct of dataProductSalesQuotation.data.data) {
                dataProduct.image = (dataProduct.pt_code) ? await this.getImage(dataProduct.pt_code) : '-'
            }

            res.status(200)
                .json({
                    status: 'berhasil',
                    message: 'berhasil mengambil data',
                    data: dataProductSalesQuotation.data.data
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'gagal',
                    message: 'gagal mengambil data',
                    error: error.response.data.error
                })
            }
    }

    getPackage = (req, res) => {
        let entity = (req.query.entity) ? req.query.entity : ''
        axios.get(`${ordermicroservice}/order-service/client/sales-quotation/package?entity=${entity}`,
        {
            headers: {
                authorization: req.headers['authorization']
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result.data.data,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.response.data.error
                })
        })
    }

    getTransferIssue = (req, res) => {
        let sqCode = (req.query.sqcode) ? req.query.sqcode : ''

        axios.get(`${ordermicroservice}/order-service/client/sales-quotation/transfer-issue?sqcode=${sqCode}`)
            .then(result => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: result.data.data,
                        error: null
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'failed',
                        data: null,
                        error: err.message
                    })
            })
    }

    getImage = async (pt_code) => {
        let photo = await axios.get(`${productknowledgemicroservice}/exapro/${pt_code}/image`)

        return photo.data.data
    }

}

module.exports = new SalesQuotationController()