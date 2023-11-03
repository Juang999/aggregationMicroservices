const {check, validationResult} = require('express-validator')

const rules = [
    check('visit_code').notEmpty().isString(),
    check('type').notEmpty().isString(),
    check('ptnr_id').notEmpty().isString(),
    check('cus_name').notEmpty().isString(),
    check('cus_address').notEmpty().isString(),
    check('cus_phone').notEmpty().isString(),
]

const CreatePeopleToVisit = [
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

module.exports = CreatePeopleToVisit