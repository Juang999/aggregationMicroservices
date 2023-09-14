const axios = require('axios')
const {ordermicroservice} = require('../../../../config/microservice')
const {Client} = require('../../../../routes/route')
const {links} = require('../../../../helper/helper')

class InventoryController {
    getInventoryTransferReceipt = (req, res) => {
        let page = (req.query.page) ? req.query.page : 1
        let isComplete = (req.query.is_complete) ? req.query.page : 'N'
        axios.get(`${ordermicroservice}/order-service/client/inventory/transfer-receipt?page=${page}&is_complete=${isComplete}`, {
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
}

module.exports = new InventoryController()