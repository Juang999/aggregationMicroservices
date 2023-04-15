const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

route = [
    '/periode', //0
    '/periode-customer' //1
]

router.get(route[0], controller.MasterController.getPeriode)
router.get(route[1], controller.MasterController.getPeriodeSales)

module.exports = router