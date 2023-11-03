const express = require('express')
const router = express.Router()
const {Client} = require('../route')
const Controller = require('../../app/Http/Controllers/Controller')

router.get(Client.feature.pointofsales.pos_product_consigment, Controller.Client.PointofSalesController.getLastItemShipped)

module.exports = router