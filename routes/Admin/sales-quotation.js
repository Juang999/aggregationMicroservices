const express = require('express')
const router = express.Router()
const route = require('../route')
const {Admin} = require('../../app/Http/Controllers/Controller')

router.get(route.Admin.feature.SalesQuotation.index, Admin.SalesQuotationController.index)
router.get(route.Admin.feature.SalesQuotation.invitation, Admin.SalesQuotationController.invitation)
// router.get(route.Admin.feature.)

module.exports = router