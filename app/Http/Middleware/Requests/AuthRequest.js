const {check, validationResult} = require('express-validator')

const rules = [
    check('username').notEmpty().isString(),
    check('password').notEmpty().isString(),
]

const AuthRequest = [
    // rules
    rules,

    // validator
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(300)
                .json(errors.array())

            return
        }

        next()
    }
]

module.exports = AuthRequest