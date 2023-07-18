const express = require('express')
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const middleware = require('../../app/Http/kernel')

let route = [
    '/get-plan', //0
    '/create-unplan', //1
    '/planning/:plans_oid/detail' //2
]

router.get(route[0], controller.Client.PlanController.getPlan)
router.post(route[1], [middleware.UnplanRequest], controller.Client.PlanController.createUnplan)
router.get(route[2], controller.Client.PlanController.getCustomerPerPeriode)

module.exports = router