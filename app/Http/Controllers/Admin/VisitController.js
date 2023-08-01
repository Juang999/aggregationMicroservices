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
const moment = require('moment')

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
                code: salesPerson.data.code,
                status: salesPerson.data.status,
                data: salesPerson.data.data,
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                code: error.response.data.code,
                status:  error.response.data.status,
                data: null,
                error: error.response.data.error
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

        let dataVisitation = visitations.data.data

        let dataSales

        if (dataVisitation.nik_id == null) {
            dataSales = {"id": null,
                        "name": dataVisitation.usernama,
                        "nip": null,
                        "phone_number": null,
                        "email": null,
                        "address": null,
                        "photo": null,
                        "division": null,
                        "super_visor": null,
                        "status": null,
                        "role_names": [
                            null
                        ]}
        } else {
            let encryptedNikId = btoa(dataVisitation.nik_id)
            let data = await axios.get(`${employeeservice}/${encryptedNikId}/employee`)

            dataSales = data.data.data
        }

        dataSales.entity = dataVisitation.entity.en_desc
        dataSales.current_status = 'ACTIVE'
        dataSales.check_in = dataVisitation.totalCheckIn

        dataSales.total_output = dataVisitation.outputVisitation

        res.status(200)
            .json({
                code: 200,
                status: 'success!',
                data: dataSales,
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                code: 400,
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
                code: visitationSchedule.data.code,
                status: visitationSchedule.data.status,
                data: visitationSchedule.data.data,
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                code: error.response.data.code,
                status: error.response.data.status,
                data: null,
                error: error.response.data.error
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
                code: detailVisitation.data.code,
                status: dataVisitation.data.status,
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
                code: result.data.code,
                status: result.data.status,
                data: result.data.data,
                error: null
            })
    }).catch(err => {
        res.status(400)
            .json({
                code: 400,
                status: (err.response.data.status) ? err.response.data.status : err.message,
                data: null,
                error: err.response.data.error
            })
    })
}

VisitController.getSales = async (req, res) => {
    try {
        let page = (req.query.page) ? req.query.page : 1
        let search = (req.query.search) ? req.query.search : ''
    
        let salesPerson = await axios.get(`${orderservice}/order-service/admin/visitation/sales?page=${page}&search=${search}`, {
            headers: {
                'authorization': req.get('authorization')
            }
        })
        
        for (const sales of salesPerson.data.data) {
            sales._links = {
                sales: '/api/admin'+links(route.Admin.feature.visit.visitation, [':ptnr_id', sales.user_ptnr_id])
            }
        }

        res.status(200)
            .json({
                code: salesPerson.data.code,
                status: 'success!',
                data: salesPerson.data.data,
                current_page: salesPerson.data.current_page,
                total_page: salesPerson.data.total_page,
                error: null
            })
    } catch (error) {
        res.status(400)
            .json({
                code: error.response.data.code,
                status: error.response.data.status,
                data: null,
                error: error.response.data.error
            })
    }
}

VisitController.getDataCheckin = async (req, res) => {
    let startdate = (req.query.startdate) ? moment(req.query.startdate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
    let enddate = (req.query.enddate) ? moment(req.query.enddate).format('YYYY-MM=DD') : moment().subtract(3, 'months').format('YYYY')

    axios.get(`${orderservice}/order-service/admin/visitation/${req.params.user_ptnr_id}/checkin?startdate=${startdate}&enddate=${enddate}`, {
        headers: {
            'authorization': req.get('authorization')
        }
    })
    .then(result => {
        res.status(200)
            .json({
                code: result.data.code,
                status: 'success!',
                data: result.data.data,
                error: null
            })
    })
    .catch(err => {
        res.status(400)
            .json({
                code: err.response.data.code,
                status: err.response.data.status,
                data: null,
                error: err.response.data.error
            })
    })
}

VisitController.getSOForSQ = (req, res) => {
    let startdate = (req.query.start_date) ? moment(req.query.start_date).format('YYYY-MM-DD') : moment().subtract(3, 'months').format('YYYY-MM-26')
    let enddate = (req.query.end_date) ? moment(req.query.end_date).format('YYYY-MM=DD') : moment().format('YYYY-MM-25')

    axios.get(`${orderservice}/order-service/admin/visitation/${req.params.user_ptnr_id}/sales-quotation?startdate=${startdate}&enddate=${enddate}`, {
        headers: {
            authorization: req.get('authorization')
        }
    })
    .then(result => {
        res.status(200)
            .json({
                code: result.data.code,
                status: 'success!',
                data: result.data.data,
                error: null
            })
    })
    .catch(err => {
        res.status(400)
            .json({
                code: err.resposne.data.code,
                status: err.response.data.status,
                data: null,
                error: err.response.data.error
            })
    })
}

VisitController.getDataOutput = (req, res) => {
    let startdate = (req.query.start_date) ? moment(req.query.start_date).format('YYYY-MM-DD') : moment().subtract(3, 'months').format('YYYY-MM-26')
    let enddate = (req.query.end_date) ? moment(req.query.end_date).format('YYYY-MM=DD') : moment().format('YYYY-MM-25')

    let code_id = req.query.code

    axios.get(`${orderservice}/order-service/admin/visitation/${req.params.user_ptnr_id}/output?code_id=${code_id}&startdate=${startdate}&enddate=${enddate}`, {
        headers: {
            'authorization': req.get('authorization')
        }
    })
    .then(result => {
        res.status(200)
            .json({
                code: result.data.code,
                status: 'success!',
                data: result.data.data,
                error: null
            })
    })
    .catch(err => {
        res.status(400)
            .json({
                code: err.response.data.code,
                status: err.response.data.status,
                data: null,
                error: err.response.data.response
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