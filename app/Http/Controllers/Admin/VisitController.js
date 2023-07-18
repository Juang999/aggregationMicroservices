const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderservice = microservice.ordermicroservice
const route = require('../../../../routes/route')
const {links} = require('../../../../helper/helper')

const VisitController = {}

VisitController.index = async (req, res) => {
    try {
        let page = (req.query.page) ? req.query.page : 1

        let salesPerson = await axios.get(`${orderservice}/order-service/admin/visitation?page=${page}`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })

        for (const sales of salesPerson.data.data) {
            sales._links = {
                visitation: '/api/admin'+links(route.Admin.feature.visit.visitation, [':ptnr_id', sales.ptnr_id])
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

VisitController.sales = async (req, res) => {
    try {
        let visitations = await axios.get(`${orderservice}/order-service/admin/visitation/${req.params.ptnr_id}/sales`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })

        for (const visitation of visitations.data.data) {
            visitation._links = {
                visitation_schedule: `${route.route_default}${route.Admin.route_admin}${links(route.Admin.feature.visit.visitation_schedule, [':visit_code', visitation.visit_code])}`
            }
        }

        res.status(200)
            .json({
                status: 'success!',
                data: visitations.data.data,
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

VisitController.visitationSchedule = async (req, res) => {
    try {
        let page = (req.query.page) ? req.query.page : 1

        let visitationSchedule = await axios.get(`${orderservice}/order-service/admin/visitation/${req.params.visit_code}/schedule?page=${pageP}`,
        {
            headers: {
                'authorization': req.get('authorization')
            }
        })

        for (const detailVisitationSchedule of visitationSchedule.data.data.visit_detail) {
            detailVisitationSchedule._links = {
                detail_visitation: `${route.route_default}${route.Admin.route_admin}${links(route.Admin.feature.visit.visitation_detail, [':visited_oid', detailVisitationSchedule.visited_oid])}`
            }
        }

        res.status(200)
            .json({
                status: 'success!',
                data: visitationSchedule.data.data,
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                status: error.message,
                data: null,
                error: error.message
            })
    }
}

VisitController.detailVisitation = async (req, res) => {
    try {
        let detailVisitation = await axios.get(`${orderservice}/order-service/admin/visitation/${req.params.visited_oid}/detail`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })

        res.status(200)
            .json({
                status: 'success!',
                data: detailVisitation.data.data,
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

module.exports = VisitController