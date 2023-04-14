const express = require("express")
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

const route = [
    '/get-partner',
    '/get-customer'
]

router.get(route[0], controller.PartnerController.getPartner);
router.get(route[1], controller.PartnerController.getCustomer);

module.exports = router