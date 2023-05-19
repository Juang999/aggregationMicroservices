const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')
const middleware = require('../app/Http/kernel')

let route = [
    '/get-visit-schedule', //0
    '/get-detail-visit-schedule/:visit_code', //1
    '/get-detail-visit/:visited_oid', //2
    '/create-schedule-visiting', //3
    '/people-to-visit', //4
    '/checkin/:visited_oid', //5
    '/checkout/:visited_oid' //6
]

router.get(route[0], controller.VisitController.getVisitSchedule)
router.get(route[1], controller.VisitController.getDetailVisitSchedule)
router.get(route[2], controller.VisitController.getDetailVisit)
router.post(route[3], controller.VisitController.createScheduleVisit)
router.post(route[4], controller.VisitController.createPeopleToVisit)
router.patch(route[5], [middleware.CheckinRequest], controller.VisitController.checkIn)
router.patch(route[6], [middleware.CheckoutRequest], controller.VisitController.checkOut)

module.exports = router