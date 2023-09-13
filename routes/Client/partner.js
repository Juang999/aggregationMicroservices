const express = require("express")
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const middleware = require('../../app/Http/kernel')
const {Client} = require('../route')

router.get(Client.feature.partner.partner_customer, controller.Client.PartnerController.getPartner);
router.get(Client.feature.partner.partner_parent, controller.Client.PartnerController.getParentSales);
router.get(Client.feature.partner.partner_mitra, controller.Client.PartnerController.getSalesPartner);
router.get(Client.feature.partner.partner_location, controller.Client.PartnerController.getPartnerLocation);
router.get(Client.feature.partner.partner_warehouse, controller.Client.PartnerController.getPartnerWithWarehouse);
router.get(Client.feature.partner.partner_detail_customer, controller.Client.PartnerController.getDetailCustomer);
router.post(Client.feature.partner.partner_create_customer, [middleware.CreatePartnerRequest], controller.Client.PartnerController.createNewCustomer);

module.exports = router