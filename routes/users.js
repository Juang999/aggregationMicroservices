var express = require('express');
var router = express.Router();
var AuthController = require('../app/Http/Controllers/AuthController')
var {body} = require('express-validator')
const middleware = require('../app/Http/kernel')

let route = [
    '/login', //0
    '/profile' //1
]

router.post(route[0], AuthController.login)
router.get(route[1], AuthController.profile)

module.exports = router;
