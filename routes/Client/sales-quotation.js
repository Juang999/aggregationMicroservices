const express = require('express')
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')

const route = [
    '/site', //0
    '/location/:en_id', //1
    '/location-to', //2
    '/location-git', //3
    '/get-sales-quotation', //4
    '/price-list/partnergroupid/:partnerGroupId', //5
    '/post-sales-quotation', //6
    '/sum-debt-customer/partnerid/:partnerId', //7
    '/get-limit-credit-customer/partnerid/:partnerId', //8
    '/get-account-name', //9
    '/get-product/pricelist/:priceListOid/area/:areaId/location/:locId', //10
    '/get-area', //11
]

router.get(route[0], controller.Client.SalesQuotationController.getSite)
// router.get(route[1], controller.Client.SalesQuotationController.getLocation)
// router.get(route[2], controller.Client.SalesQuotationController.getLocationTo)
// router.get(route[3], controller.Client.SalesQuotationController.getLocationGit)
router.get(route[4], controller.Client.SalesQuotationController.getSalesQuotation)
router.get(route[5], controller.Client.SalesQuotationController.getPriceList)
router.post(route[6], controller.Client.SalesQuotationController.createSalesQuotation)
router.get(route[7], controller.Client.SalesQuotationController.sumDebtCustomer)
router.get(route[8], controller.Client.SalesQuotationController.getLimitCreditCustomer)
router.get(route[9], controller.Client.SalesQuotationController.getAccountName)
router.get(route[10], controller.Client.SalesQuotationController.getProductForSQ)
router.get(route[11], controller.Client.SalesQuotationController.getArea)
router.get(route[1], controller.Client.SalesQuotationController.getLocation)

module.exports = router