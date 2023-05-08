const express = require("express")
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

const route = [
    '/get-customer', //0
    '/create-new-customer', //1
    '/get-detail-customer/:ptnr_oid', //2
]

router.get(route[0], controller.PartnerController.getPartner);
router.post(route[1], controller.PartnerController.createNewCustomer);
router.get(route[2], controller.PartnerController.getDetailCustomer);

module.exports = router