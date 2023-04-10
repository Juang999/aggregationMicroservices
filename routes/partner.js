const express = require("express")
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

const route = [
    '/get-partner'
]

router.get(route[0], controller.PartnerController.getPartner);

module.exports = router