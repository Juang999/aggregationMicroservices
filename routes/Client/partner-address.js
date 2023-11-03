const express = require('express')
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const middleware = require('../../app/Http/kernel')
const {Client} = require('../route')

router.get(Client.feature.partner_address.partner_detail_address, controller.Client.PartnerAddressController.show)
router.post(Client.feature.partner_address.partner_create_address, [middleware.CreatePartnerAddressRequest], controller.Client.PartnerAddressController.create)

module.exports = router