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
    '/product/:product/color/:color_id/size/:size_id', //6
    '/category', //7
    '/product/category/:category_id', //8
    '/category/sub_category/:cat_id', //9
    '/size' //10
]

router.get(route[0], controller.PKController.index)
router.get(route[1], controller.PKController.getAgent)
router.get(route[2], controller.PKController.show)
router.get(route[3], controller.PKController.getTypeOfPrice)
router.get(route[4], controller.PKController.showSize)
router.get(route[5], controller.PKController.getPaymentType)
router.get(route[6], controller.PKController.getGrade)
router.get(route[7], controller.PKController.getCategory)
router.get(route[8], controller.PKController.getProductFilteredWithCategory)
router.get(route[9], controller.PKController.getSubCategory)
router.get(route[10], controller.PKController.getSize)

module.exports = router