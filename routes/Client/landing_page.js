const {Router} = require('express')
const router = Router()
const {Client} = require('../../app/Http/Controllers/Controller')
const {Client: ciientRouter} = require('../route');

router.get(ciientRouter.feature.landing_page.landing_page_category, Client.LandingPageController.getCategory)
router.get(ciientRouter.feature.landing_page.landing_page_carousel, Client.LandingPageController.getCarousel)
router.get(ciientRouter.feature.landing_page.landing_page_best_seller, Client.LandingPageController.getBestSeller)

module.exports = router