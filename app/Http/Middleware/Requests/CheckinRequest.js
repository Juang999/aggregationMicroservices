const {check, validationResult} = require('express-validator')

const rules = [
    check('visit_code').notEmpty().isString(),
    check('lat_checkin').notEmpty().isNumeric(),
    check('long_checkin').notEmpty().isNumeric(),
    check('address_checkin').notEmpty().isString(),
    check('objective_checkin').notEmpty().isString()
]

const CheckinRequest = [
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

module.exports = CheckinRequest