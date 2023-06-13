const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

const route = [
    '/site', //0
    '/location', //1
    '/location-to', //2
    '/location-git' //3
]

router.get(route[0], controller.SalesQuotationController.getSite)
router.get(route[1], controller.SalesQuotationController.getLocation)
router.get(route[2], controller.SalesQuotationController.getLocationTo)
router.get(route[3], controller.SalesQuotationController.getLocationGit)

module.exports = router