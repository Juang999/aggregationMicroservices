const express = require('express')
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const middleware = require('../../app/Http/kernel')
const {Client} = require('../route')

router.get(Client.feature.planning.plans_index, controller.Client.PlanController.getPlan)
router.get(Client.feature.planning.plans_detail, controller.Client.PlanController.getCustomerPerPeriode)
router.post(Client.feature.planning.plans_create, [middleware.UnplanRequest], controller.Client.PlanController.createUnplan)

module.exports = router