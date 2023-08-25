const express = require("express")
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const middleware = require('../../app/Http/kernel')
const {Client} = require('../route')

const route = [
    '/get-customer', //0
    '/create-new-customer', //1
    '/get-detail-customer/:ptnr_oid', //2
]

router.get(Client.feature.partner.partner_customer, controller.Client.PartnerController.getPartner);
router.get(Client.feature.partner.partner_detail_customer, controller.Client.PartnerController.getDetailCustomer);
router.post(Client.feature.partner.partner_create_customer, [middleware.CreatePartnerRequest], controller.Client.PartnerController.createNewCustomer);

module.exports = router