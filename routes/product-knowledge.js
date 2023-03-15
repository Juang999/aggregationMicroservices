var express = require('express');
var router = express.Router();
const middleware = require('../app/Http/kernel')
const controller = require('../app/Http/Controllers/Controller')

router.get('/index', [middleware.authenticate], controller.PKController.index)
router.get('/detail/:id', [middleware.authenticate], controller.PKController.show)

module.exports = router