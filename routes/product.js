const express = require('express')
const router = express.Router()
const {Default} = require('./route')
const Controller = require('../app/Http/Controllers/Controller')

router.get(Default.feature.product_knowledge.pk_image, Controller.ProductKnowledgeController.image)
router.get(Default.feature.product_knowledge.pk_desc, Controller.ProductKnowledgeController.description)

module.exports = router