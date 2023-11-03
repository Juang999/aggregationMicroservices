const {check, validationResult} = require('express-validator')

const rules = [
    check('lat_checkout').notEmpty().isNumeric(),
    check('long_checkout').notEmpty().isNumeric(),
    check('address_checkout').notEmpty().isString(),
    check('result_checkout').notEmpty().isString(),
    check('output_checkout').notEmpty().isNumeric(),
]

const CheckoutRequest = [
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

module.exports = CheckoutRequest