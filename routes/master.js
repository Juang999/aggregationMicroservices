const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

route = [
    '/periode' //0
]

router.get(route[0], controller.MasterController.getPeriode)

module.exports = router