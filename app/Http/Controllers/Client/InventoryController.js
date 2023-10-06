const axios = require('axios')
const {ordermicroservice, productknowledgemicroservice} = require('../../../../config/microservice')
const {Client} = require('../../../../routes/route')
const {links} = require('../../../../helper/helper')
const moment = require('moment')

class InventoryController {
    getInventoryTransferReceipt = (req, res) => {
        let page = (req.query.page) ? req.query.page : 1
        let isComplete = (req.query.is_complete) ? req.query.is_complete : 'N'
        let startDate = (req.query.start_date) ? moment(req.query.start_date).format('YYYY-MM-DD') : moment().startOf('months').format('YYYY-MM-DD')
        let endDate = (req.query.end_date) ? moment(req.query.end_date).format('YYYY-MM-DD') : moment().endOf('months').format('YYYY-MM-DD')

        axios.get(`${ordermicroservice}/order-service/client/inventory/transfer-receipt?page=${page}&is_complete=${isComplete}&start_date=${startDate}&end_date=${endDate}`, {
            headers: {
                authorization: req.headers['authorization']
            }
        })
        .then(result => {
            let link = result.data.data.map((item, index) => {
                return {
                    transfer_oid: item.transfer_oid,
                    location_id: item.location_id,
                    entity_name: item.entity_name,
                    ship_to: item.ship_to,
                    location_name: item.location_name,
                    receiver_name: item.receiver_name,
                    qty_product: item.qty_product,
                    date: item.date,
                    _links: {
                        detail: `/api/inventory${links(Client.feature.inventory.invc_detail_transfer_receipt, [':ptsfr_oid', item.transfer_oid])}`
                    }
                }
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: link,
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

    detailInventoryTransferReceipt = (req, res) => {
        axios.get(`${ordermicroservice}/order-service/client/inventory/${req.params.ptsfr_oid}/detail-transfer-receipt`, {
            headers: {
                authorization: req.headers['authorization']
            }
        })
        .then(result => {
            result.data.data._links = {
                update: `/api/inventory${links(Client.feature.inventory.invc_update_transfer_receipt, [':ptsfr_oid', result.data.data.ptsfr_oid])}`
            }

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

    updateTransferReceipt = (req, res) => {
        axios.patch(`${ordermicroservice}/order-service/client/inventory/${req.params.ptsfr_oid}/update-transfer-receipt`, {
            loc_git: req.body.loc_git,
            loc_to_id: req.body.loc_to_id,
            is_booked: req.body.is_booked,
            body_transfer_receipt: req.body.detail_transfer_receipt
        }, {
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

    inventoryPerPartner = (req, res) => {
        let pageNumber = (req.query.page) ? req.query.page : 1
        let entity = (req.query.entity) ? req.query.entity : ''
        let search = (req.query.search) ? req.query.search : ''

        axios.get(`${ordermicroservice}/order-service/client/inventory/${req.params.ptnr_id}/exapro?page=${pageNumber}&entity=${entity}&search=${search}`, {
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

    getImage = async (pt_code) => {
        let dataImage = await axios.get(`${productknowledgemicroservice}/exapro/${pt_code}/image`)

        return dataImage.data.data
    }
}

module.exports = new InventoryController()