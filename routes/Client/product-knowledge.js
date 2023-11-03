var express = require('express');
var router = express.Router()
const {Client} = require('../route')
const Controller = require('../../app/Http/Controllers/Controller')

router.get(Client.feature.product.product_size, Controller.Client.ProductController.getSize)
router.get(Client.feature.product.product_grade, Controller.Client.ProductController.getGrade)
router.get(Client.feature.product.product_price_list, Controller.Client.ProductController.getPrice)
router.get(Client.feature.product.product_category, Controller.Client.ProductController.getCategory)
router.get(Client.feature.product.product_sub_category, Controller.Client.ProductController.getSubCategory)
router.get(Client.feature.product.product_by_location, Controller.Client.ProductController.getProductByLocation)
router.get(Client.feature.product.product_by_price_list, Controller.Client.ProductController.getProductByPriceList)
router.get(Client.feature.product.product_detail_by_price_list, Controller.Client.ProductController.showProductByPriceList)
router.get(Client.feature.product.product_detail_by_location, Controller.Client.ProductController.showProductByLocation)
module.exports = router