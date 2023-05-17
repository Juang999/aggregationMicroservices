const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

let route = [
    '/get-visit-schedule',
    '/get-detail-visit-schedule/:visit_code',
    '/get-detail-visit/:visited_oid'
]

router.get(route[0], controller.VisitController.getVisitSchedule)
router.get(route[1], controller.VisitController.getDetailVisitSchedule)
router.get(route[2], controller.VisitController.getDetailVisit)

module.exports = router