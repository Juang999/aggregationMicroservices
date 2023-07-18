const express = require('express')
const router = express.Router()
const route = require('../route')
const {Admin} = require('../../app/Http/Controllers/Controller')

router.get(route.Admin.feature.visit.index, Admin.VisitController.index)
router.get(route.Admin.feature.visit.invitation, Admin.VisitController.sales)

module.exports = router