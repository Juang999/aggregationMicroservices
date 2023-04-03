var express = require('express');
var router = express.Router()
const controller = require('../app/Http/Controllers/Controller')

const route = [
    '/index', //0
    '/group', //1
    '/detail/:id', //2
    '/price/:group_id', //3
    '/product/:product/color/:color', //4
    '/product/:product/color/:color/size/:size/price/:price_type/entity/:en_id/grade/:grade', //5
    '/product/:product/color/:color_id/size/:size_id' //6
]

router.get(route[0], controller.PKController.index)
router.get(route[1], controller.PKController.getAgent)
router.get(route[2], controller.PKController.show)
router.get(route[3], controller.PKController.getTypeOfPrice)
router.get(route[4], controller.PKController.showSize)
router.get(route[5], controller.PKController.getPaymentType)
router.get(route[6], controller.PKController.getGrade)

module.exports = router