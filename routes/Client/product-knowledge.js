var express = require('express');
var router = express.Router()
const controller = require('../../app/Http/Controllers/Controller')

const route = [
    '/product-by-price-list', //0
    '/group', //1
    '/detail-product-by-price-category/:pt_id/pi_oid/:pi_oid', //2
    '/price', //3
    '/product/:product/color/:color', //4
    '/product/:product/color/:color/size/:size/price/:price_type/entity/:en_id/grade/:grade', //5
    '/product/:product/color/:color_id/size/:size_id', //6
    '/category', //7
    '/product/category/:category_id', //8
    '/category/sub_category/:cat_id', //9
    '/size', //10
    '/get-all-product', //11
    '/product-by-location/', //12
    '/detail-product-by-location/:pt_id/entity/:entity' //13
]

router.get(route[0], controller.Client.PKController.getProductByPriceList)
router.get(route[1], controller.Client.PKController.getAgent)
router.get(route[2], controller.Client.PKController.showProductByPriceCategory)
router.get(route[3], controller.Client.PKController.getPrice)
router.get(route[4], controller.Client.PKController.showSize)
router.get(route[5], controller.Client.PKController.getPaymentType)
router.get(route[6], controller.Client.PKController.getGrade)
router.get(route[7], controller.Client.PKController.getCategory)
router.get(route[8], controller.Client.PKController.getProductFilteredWithCategory)
router.get(route[9], controller.Client.PKController.getSubCategory)
router.get(route[10], controller.Client.PKController.getSize)
router.get(route[11], controller.Client.PKController.getAllProduct)
router.get(route[12], controller.Client.PKController.getProductByLocation)
router.get(route[13], controller.Client.PKController.showProductByLocation)

module.exports = router