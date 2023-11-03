const {check, validationResult} = require('express-validator')

const rules = [
    check('partnerDomain').notEmpty().isNumeric(),
    check('partnerIsEntity').notEmpty().isNumeric(),
    check('partnerLine1').notEmpty().isString(),
    check('partnerLine2').notEmpty().isString(),
    check('partnerLine3').notEmpty().isString(),
    check('partnerPhone1').notEmpty().isString(),
    check('partnerPhone2').notEmpty().isString(),
    check('partnerFax1').notEmpty().isString(),
    check('partnerFax2').notEmpty().isString(),
    check('partnerZip').notEmpty().isString(),
    check('partnerOid').notEmpty().isString(),
    check('partnerAddressType').notEmpty().isNumeric(),
    check('partnerComment').isEmpty().isString(),
    check('partnerActive').notEmpty().isString()
]

const CreatePartnerAddressRequest = [
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

module.exports = CreatePartnerAddressRequest