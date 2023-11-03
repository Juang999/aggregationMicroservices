const axios = require('axios')
const {ordermicroservice} = require('../../../../config/microservice')
const moment = require('moment')
const {links} = require('../../../../helper/helper')
const {Client} = require('../../../../routes/route')

class ReportController {
    getTotalPercentageOfSales = (req, res) => {
        let startDate = (req.query.start_date) ? req.query.start_date : ''
        let endDate = (req.query.end_date) ? req.query.end_date : ''

        axios.get(`${ordermicroservice}/order-service/client/report/so?start_date=${startDate}&end_date=${endDate}`, {
            headers: {
                authorization: req.get('authorization')
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
                    status: 'failed!',
                    data: null,
                    error: err.response.data.error
                })
        })
    }

    getHistoryDebt = (req, res) => {
        let startDate = (req.query.startdate) ? moment(req.query.startdate).format('YYYY-MM-DD') : moment().startOf('months').format('YYYY-MM-DD')
        let endDate = (req.query.enddate) ? moment(req.query.enddate).format('YYYY-MM-DD') : moment().endOf('months').format('YYYY-MM-DD')
        let status = (req.query.status) ? 'C' : null

        axios.get(`${ordermicroservice}/order-service/client/report/debt?start_date=${startDate}&end_date=${endDate}&status=${status}`, {
            headers: {
                authorization: req.headers['authorization']
            }
        })
        .then(result => {
            for (const detailData of result.data.data.history_debt) {
                detailData._links = {
                    detail: `/api/report${links(Client.feature.report.report_detail_history_debt, [':ar_oid', detailData.ar_oid])}`
                }
            }

            res.status(200)
                .json({
                    status: 'success',
                    data: result.data.data,
                    error: null
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: (err.response.data.error) ? err.response.data.error : err.mesage
                })
        })
    }

    getDetailHistoryDebt = (req, res) => {
        axios.get(`${ordermicroservice}/order-service/client/report/debt/${req.params.ar_oid}/detail`, {
            headers: {
                authorization: req.headers['authorization']
            }
        })
        .then(result => {
            for (const detailData of result.data.data.data_so) {
                detailData._links = {
                    detail_so: `/api/report${links(Client.feature.report.report_detail_shipment, [':so_oid', detailData.arso_so_oid])}`
                }
            }

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

    getDetailShipment = (req, res) => {
        axios.get(`${ordermicroservice}/order-service/client/report/so/${req.params.so_oid}/shipment`, {
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
}

module.exports = new ReportController()