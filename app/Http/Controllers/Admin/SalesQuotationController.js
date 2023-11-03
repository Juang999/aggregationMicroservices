const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderservice = microservice.ordermicroservice
const route = require('../../../../routes/route')
const {links} = require('../../../../helper/helper')

const SalesQuotationController = {}

SalesQuotationController.index = async (req, res) => {
    try {
        let page = (req.query.page) ? req.query.page : 1

        let salesPerson = await axios.get(`${orderservice}/order-service/admin/visitation?page=${page}`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })

        for (const sales of salesPerson.data.data) {
            sales._links = {
                invitation: '/api/admin'+links(route.Admin.SalesQuotation.invitation, [':ptnr_id', sales.ptnr_id])
            }
        }

        res.status(200)
            .json({
                status: 'succeed!',
                data: salesPerson.data.data,
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                status: 'failed!',
                data: null,
                error: error.message
            })
    }
}

SalesQuotationController.invitation = async (req, res) => {
    try {
        let invitations = await axios.get(`${orderservice}/order-service/admin/sales-quotation/${req.params.ptnr_id}/invitation`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })

        res.status(200)
            .json({
                status: 'success!',
                data: invitations.data.data,
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                status: 'failed!',
                data: null,
                error: error.message
            })
    }
}

module.exports = SalesQuotationController