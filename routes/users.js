var express = require('express');
var router = express.Router();
var AuthController = require('../app/Http/Controllers/AuthController')
var {body} = require('express-validator')

router.post('/login',
    body('username').isString(),
    body('password').isString(),
    AuthController.login)

module.exports = router;
