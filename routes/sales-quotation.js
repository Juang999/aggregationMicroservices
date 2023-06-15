const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

const route = [
    '/site', //0
    '/location', //1
    '/location-to', //2
    '/location-git', //3
    '/sales-quotation' //4
]

router.get(route[0], controller.SalesQuotationController.getSite)
router.get(route[1], controller.SalesQuotationController.getLocation)
router.get(route[2], controller.SalesQuotationController.getLocationTo)
router.get(route[3], controller.SalesQuotationController.getLocationGit)
router.get(route[4], controller.SalesQuotationController.getSalesQuotation)

module.exports = router