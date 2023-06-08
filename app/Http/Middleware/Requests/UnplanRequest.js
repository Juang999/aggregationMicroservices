const {check, validationResult} = require('express-validator')

const rules = [
    check('ptnr_id').notEmpty().isString(),
    check('amount').notEmpty().isNumeric(),
    check('periode_code').notEmpty().isString()
]

const UnplanRequest = [
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

module.exports = UnplanRequest