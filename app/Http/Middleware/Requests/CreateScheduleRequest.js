const {check, validationResult} = require('express-validator')

const rules = [
    check('start_date').notEmpty().isString(),
    check('end_date').notEmpty().isString(),
]

const CreateScheduleToVisit = [
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

module.exports = CreateScheduleToVisit