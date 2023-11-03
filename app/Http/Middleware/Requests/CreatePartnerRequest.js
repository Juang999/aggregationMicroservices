const {check, validationResult} = require('express-validator')

const rules = [
    check('partnerEntity').notEmpty().isNumeric(),
    check('partnerName').notEmpty().isString(),
    check('partnerNameAlternative').notEmpty().isString(),
    check('partnerGroupId').notEmpty().isNumeric(),
    check('partnerParent').isEmpty().isNumeric(),
    check('partnerCurrencyId').notEmpty().isNumeric(),
    check('partnerTransactionCodeId').notEmpty().isNumeric(),
    check('partnerEmail').notEmpty().isEmail(),
    check('partnerActive').notEmpty().isString(),
    check('partnerIsVendor').notEmpty().isString(),
    check('partnerIsCustomer').notEmpty().isString(),
    check('partnerIsMember').notEmpty().isString(),
    check('partnerIsWriter').notEmpty().isString(),
    check('partnerIsEmployee').notEmpty().isString(),
    check('partnerIsPs').notEmpty().isString(),
    check('partnerIsBm').notEmpty().isString(),
    check('partnerIsVolunteer').notEmpty().isString(),
    check('partnerIsSbm').notEmpty().isString(),
    check('partnerSex').notEmpty().isNumeric(),
    check('partnerBloodGroup').notEmpty().isNumeric(),
    check('partnerDateBirthday').notEmpty().isDate(),
    check('partnerNation').notEmpty().isNumeric(),
    check('partnerBpDate').notEmpty().isDate(),
    check('partnerBpType').notEmpty().isNumeric(),
    check('customerIsDistributor').isEmpty().isNumeric(),
]

const CreatePartnerRequest = [
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

module.exports = CreatePartnerRequest