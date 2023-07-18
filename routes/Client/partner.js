const express = require("express")
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const middleware = require('../../app/Http/kernel')

const route = [
    '/get-customer', //0
    '/create-new-customer', //1
    '/get-detail-customer/:ptnr_oid', //2
]

router.get(route[0], controller.Client.PartnerController.getPartner);
router.post(route[1], [middleware.CreatePartnerRequest], controller.Client.PartnerController.createNewCustomer);
router.get(route[2], controller.Client.PartnerController.getDetailCustomer);

module.exports = router