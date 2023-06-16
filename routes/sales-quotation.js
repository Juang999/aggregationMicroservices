const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

const route = [
    '/site', //0
    '/location', //1
    '/location-to', //2
    '/location-git', //3
    '/get-sales-quotation', //4
    '/price-list/partnergroupid/:partnerGroupId', //5
    '/post-header-sales-quotation' //6
]

router.get(route[0], controller.SalesQuotationController.getSite)
router.get(route[1], controller.SalesQuotationController.getLocation)
router.get(route[2], controller.SalesQuotationController.getLocationTo)
router.get(route[3], controller.SalesQuotationController.getLocationGit)
router.get(route[4], controller.SalesQuotationController.getSalesQuotation)
router.get(route[5], controller.SalesQuotationController.getPriceList)
router.post(route[6], controller.SalesQuotationController.createSalesQuotation)

module.exports = router