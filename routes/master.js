const express = require('express')
const router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

route = [
    '/periode', //0
    '/periode-customer', //1
    '/tax_invoice', //2
    '/addr_type', //3
    '/contact_person', //4
    '/bp_type', //5
    '/citizen', //6
    '/blood_group', //7
    '/gender', //8
    '/currency', //9
    '/get-entity', //10
    '/default-periode', //11
    '/location' //12
]

router.get(route[0], controller.MasterController.getPeriode)
router.get(route[1], controller.MasterController.getPeriodeSales)
router.get(route[2], controller.MasterController.getTaxInvoice)
router.get(route[3], controller.MasterController.getAddrType)
router.get(route[4], controller.MasterController.getContactPerson)
router.get(route[5], controller.MasterController.getBpType)
router.get(route[6], controller.MasterController.getCitizen)
router.get(route[7], controller.MasterController.getBloodGroup)
router.get(route[8], controller.MasterController.getGender)
router.get(route[9], controller.MasterController.getCurrency)
router.get(route[10], controller.MasterController.getEntity)
router.get(route[11], controller.MasterController.getDefaultPeriode)
router.get(route[12], controller.MasterController.getLocation)

module.exports = router