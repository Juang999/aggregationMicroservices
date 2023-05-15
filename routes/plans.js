const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

let route = [
    '/get-plan', //0
    '/create-unplan', //1
    '/customer-per-periode' //2
]

router.get(route[0], controller.PlanController.getPlan)
router.post(route[1], controller.PlanController.createUnplan)
router.get(route[2], controller.PlanController.getCustomerPerPeriode)

module.exports = router