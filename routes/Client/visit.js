const express = require('express')
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const middleware = require('../../app/Http/kernel')

let route = [
    '/get-visit-schedule', //0
    '/get-detail-visit-schedule/:visit_code', //1
    '/get-detail-visit/:visited_oid', //2
    '/create-schedule-visiting', //3
    '/people-to-visit', //4
    '/checkin/:visited_oid', //5
    '/checkout/:visited_oid', //6
    '/delete-from-list-schedule/:visited_oid', //7
    '/delete-schedule/:visit_code', //8
    '/get-all-costomer-per-periode', //9
    '/get-visit-type', //10
    '/get-output-visit-type' //11
]

router.get(route[0], controller.Client.VisitController.getVisitSchedule)
router.get(route[1], controller.Client.VisitController.getDetailVisitSchedule)
router.get(route[2], controller.Client.VisitController.getDetailVisit)
router.post(route[3], [middleware.CreateScheduleToVisit], controller.Client.VisitController.createScheduleVisit)
router.post(route[4], [middleware.CreatePeopleToVisit], controller.Client.VisitController.createPeopleToVisit)
router.patch(route[5], [middleware.CheckinRequest], controller.Client.VisitController.checkIn)
router.patch(route[6], [middleware.CheckoutRequest], controller.Client.VisitController.checkOut)
router.delete(route[7], controller.Client.VisitController.deleteFromListSchedule)
router.delete(route[8], controller.Client.VisitController.deleteSchedule)
router.get(route[9], controller.Client.VisitController.getCustomerPerPeriode)
router.get(route[10], controller.Client.VisitController.getVisitType)
router.get(route[11], controller.Client.VisitController.getOutputVisitType)

module.exports = router