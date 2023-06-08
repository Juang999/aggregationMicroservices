const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')
const middleware = require('../app/Http/kernel')

let route = [
    '/create-contact-address', //0 -> toCreateNewContactPerson
    '/detail-contact-address/:ptnrac_oid', //1 -> toGetDetailDataContactPerson
]

router.post(route[0], [middleware.CreatePartnerContactRequest], controller.PartnerContactController.create)
router.get(route[1], controller.PartnerContactController.show)

module.exports = router