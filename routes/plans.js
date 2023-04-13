const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

let route = [
    '/get-plan' //0
]

router.get(route[0], controller.PlanController.getPlan)

module.exports = router