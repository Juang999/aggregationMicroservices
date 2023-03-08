var express = require('express');
var router = express.Router();
var {body} = require('express-validator')
const middleware = require('../app/Http/kernel')
const controller = require('../app/Http/Controllers/Controller')

router.get('/index', [middleware.authenticate], controller.PKController.index)

module.exports = router