var express = require('express');
var router = express.Router();
var AuthController = require('../app/Http/Controllers/AuthController')
var {body} = require('express-validator')
const middleware = require('../app/Http/kernel')
const {Admin, logout} = require('../routes/route')

let route = [
    '/login', //0
    '/profile', //1
    '/admin-login' //2
]

router.post(route[0], [middleware.AuthRequest], AuthController.login)
router.get(route[1], AuthController.profile)
router.post(route[2], AuthController.adminLogin)
router.get(Admin.feature.Auth.admin_profile, AuthController.AdminProfile)
router.delete(logout, AuthController.Logout)

module.exports = router;
