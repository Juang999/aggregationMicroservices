const {check, validationResult} = require('express-validator')

const rules = [
    check('lat_checkout').notEmpty().isNumeric(),
    check('long_checkout').notEmpty().isNumeric(),
    check('address_checkout').notEmpty().isString(),
    check('checkout_checkout').notEmpty()
]

const CheckoutRequest = [
    // rules
    rules,

    // validator
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors) {
            res.status(300)
                .json(errors.array())

            return
        }

        next()
    }
]

module.exports = CheckoutRequest