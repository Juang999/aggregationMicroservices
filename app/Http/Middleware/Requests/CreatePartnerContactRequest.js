const {check, validationResult} = require('express-validator')

const rules = [
    check('partnerAccountAddressOid').notEmpty().isString(),
    check('partnerAccountFunction').notEmpty().isNumeric(),
    check('partnerContactName').notEmpty().isString(),
    check('partnerPhone1').notEmpty().isString(),
    check('partnerContact2').notEmpty().isString(),
    check('partnerContactEmail').notEmpty().isEmail()
]

const CreatePartnerContactRequest = [
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

module.exports = CreatePartnerContactRequest