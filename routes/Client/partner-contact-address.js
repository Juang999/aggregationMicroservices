const express = require('express')
const router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')
const middleware = require('../../app/Http/kernel')
const {Client} = require('../route')

let route = [
    '/create-contact-address', //0 -> toCreateNewContactPerson
    '/detail-contact-address/:ptnrac_oid', //1 -> toGetDetailDataContactPerson
]

router.get(Client.feature.partner_contact.partner_detail_contact, controller.Client.PartnerContactController.show)
router.post(Client.feature.partner_contact.partner_create_contact, [middleware.CreatePartnerContactRequest], controller.Client.PartnerContactController.create)

module.exports = router