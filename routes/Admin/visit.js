const express = require('express')
const router = express.Router()
const route = require('../route')
const {Admin} = require('../../app/Http/Controllers/Controller')

router.get(route.Admin.feature.visit.index, Admin.VisitController.index)
router.get(route.Admin.feature.visit.visitation, Admin.VisitController.sales)
router.get(route.Admin.feature.visit.visitation_schedule, Admin.VisitController.visitationSchedule)
router.get(route.Admin.feature.visit.visitation_detail, Admin.VisitController.detailVisitation)
router.post(route.Admin.feature.visit.visitation_create_periode, Admin.VisitController.createPeriode)
router.get(route.Admin.feature.visit.visitation_sales, Admin.VisitController.getSales)
router.get(route.Admin.feature.visit.visitation_checkin, Admin.VisitController.getDataCheckin)
router.get(route.Admin.feature.visit.visitation_sales_quotation, Admin.VisitController.getSOForSQ)
router.get(route.Admin.feature.visit.visitation_output, Admin.VisitController.getDataOutput)

module.exports = router