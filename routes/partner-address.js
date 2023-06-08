const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')
const middleware = require('../app/Http/kernel')

let route = [
    '/create-partner-address', //0 -> toCreateNewAddressCustomer
    '/detail-partner-address/:ptnra_oid', //1 ->toGetDetailAddressCustomer
    // '/activate/:ptnra_oid' //2 ->toActivateDetailAddressCustomer
]

router.post(route[0], [middleware.CreatePartnerAddressRequest], controller.PartnerAddressController.create)
router.get(route[1], controller.PartnerAddressController.show)
// router.patch(route[1], controller.PartnerAddressController.activate)

module.exports = router