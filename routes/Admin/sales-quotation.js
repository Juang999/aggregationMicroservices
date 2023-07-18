const express = require('express')
const router = express.Router()
const route = require('../route')
const {Admin} = require('../../app/Http/Controllers/Controller')

router.get(route.Admin.SalesQuotation.index, Admin.SalesQuotationController.index)
router.get(route.Admin.SalesQuotation.invitation, Admin.SalesQuotationController.invitation)

module.exports = router