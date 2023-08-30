const express = require('express')
const router = express.Router()
const Controller = require('../../app/Http/Controllers/Controller')
const {Client} = require('../route')

router.get(Client.feature.report.report_so, Controller.Client.ReportController.getTotalPercentageOfSales)

module.exports = router