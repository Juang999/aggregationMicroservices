const express = require("express")
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

const route = [
    '/get-partner', //0
    '/get-customer', //1
    '/create-new-customer', //2
    '/get-detail-customer/:ptnr_oid', //3
    '/create-address-customer', //4
    '/get-detail-address-customer/:ptnra_oid', //5
    '/create-contact-person' //6
]

router.get(route[0], controller.PartnerController.getPartner);
router.get(route[1], controller.PartnerController.getCustomer);
router.post(route[2], controller.PartnerController.createNewCustomer);
router.get(route[3], controller.PartnerController.getDetailCustomer);
router.post(route[4], controller.PartnerController.createAddressCustomer);
router.get(route[5], controller.PartnerController.getDetailAddressCustomer);
router.post(route[6], controller.PartnerController.createContactPerson);

module.exports = router