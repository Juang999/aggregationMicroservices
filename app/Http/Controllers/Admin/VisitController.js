require('dotenv').config({
    path: '../../../../.env'
})

const axios = require('axios')
const microservice = require('../../../../config/microservice')
const orderservice = microservice.ordermicroservice
const route = require('../../../../routes/route')
const {links} = require('../../../../helper/helper')
const CryptoJS = require('crypto-js')
const employeeservice = microservice.employeeservice

const VisitController = {}

VisitController.index = async (req, res) => {
    try {
        let page = (req.query.page) ? req.query.page : 1
        let totalDay = (req.query.total_day) ? req.query.total_day : ''

        let salesPerson = await axios.get(`${orderservice}/order-service/admin/visitation?page=${page}&total_day=${totalDay}`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })

        for (const sales of salesPerson.data.data) {

            sales.photo = await getPhoto(sales.ptnr_nik_id)

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
                status: error.response.data.status,
                data: null,
                error: error.response.data.errors
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

        let encryptedNikId = btoa(visitations.data.data.nik_id)

        let dataSales = await axios.get(`${employeeservice}/${encryptedNikId}/employee`)

        dataSales.data.data.entity = visitations.data.data.entity.en_desc

        dataSales.data.data.current_status = 'ACTIVE'

        let data = dataSales.data.data

        res.status(200)
            .json({
                status: 'success!',
                data: data,
                error: null
            })
    } catch (error) {
        console.log(error)
        res.status(400)
            .json({
                status: 'failed!',
                data: null,
                error: error.response.data.error
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

VisitController.createPeriode = (req, res) => {
    axios.post(`${orderservice}/order-service/admin/visitation/periode`, {
        periode_oid: req.body.periode_oid,
        periode_start_date: req.body.periode_start_date,
        periode_end_date: req.body.periode_end_date,
    }, {
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
    }).catch(err => {
        res.status(400)
            .json({
                status: (err.response.data.status) ? err.response.data.status : error.message,
                data: null,
                error: err.response.data.error
            })
    })
}

VisitController.getSales = (req, res) => {
    let page = (req.query.page) ? req.query.page : 1
    let search = (req.query.search) ? req.query.search : ''

    axios.get(`${orderservice}/order-service/admin/visitation/sales?page=${page}&search=${search}`, {
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

let getPhoto = async (nik_id) => {
    let result

    if (nik_id) {
        let photo = await axios.get(`${employeeservice}/photo/${btoa(nik_id)}`)

        result = photo.data.data.img_karyawan
    } else {
        result = null
    }

    return result
}

module.exports = VisitController