const express = require('express')
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const {Client} = require('../route')
const middleware = require('../../app/Http/kernel')

router.get(Client.feature.sales_quotation.sq_site, controller.Client.SalesQuotationController.getSite)
router.get(Client.feature.sales_quotation.sq_package, controller.Client.SalesQuotationController.getPackage)
router.get(Client.feature.sales_quotation.sq_location, controller.Client.SalesQuotationController.getLocation)
router.get(Client.feature.sales_quotation.sq_debt, controller.Client.SalesQuotationController.sumDebtCustomer)
router.get(Client.feature.sales_quotation.sq_product, controller.Client.SalesQuotationController.getProductForSQ)
router.get(Client.feature.sales_quotation.sq_price_list, controller.Client.SalesQuotationController.getPriceList)
router.get(Client.feature.sales_quotation.sq_sales_quotation, controller.Client.SalesQuotationController.getSalesQuotation)
router.get(Client.feature.sales_quotation.sq_limit_credit, controller.Client.SalesQuotationController.getLimitCreditCustomer)
router.post(Client.feature.sales_quotation.sq_create_sales_quotation, [middleware.createSalesQuotationRequest], controller.Client.SalesQuotationController.createSalesQuotation)

module.exports = router