var express = require('express');
var router = express.Router();
var AuthController = require('../app/Http/Controllers/AuthController')
var {body} = require('express-validator')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',
    body('username').isString(),
    body('password').isString(),
    AuthController.login)

module.exports = router;
