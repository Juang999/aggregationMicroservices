const {check, validationResult} = require('express-validator')

const rules = [
    check('ptnr_id_sold').notEmpty().isNumeric(),
    check('pay_type').notEmpty().isNumeric(),
    check('pay_method').notEmpty().isNumeric(),
    check('cu_id').notEmpty().isNumeric(),
    check('trans_mrks').isEmpty().isString(),
    check('cons').isString().not().isEmpty(),
    check('total').notEmpty().isNumeric(),
    check('terbilang').notEmpty().isString(),
    check('need_date').notEmpty().isDate(),
    check('loc_id').notEmpty().isNumeric(),
    check('loc_to_id').notEmpty().isNumeric(),
    check('loc_gt_id').notEmpty().isNumeric(),
    check('is_dropshipper').notEmpty().isString(),
    check('ship_to').isEmpty().isString(),
    check('start_date').notEmpty().isDate(),
    check('end_date').isDate().notEmpty(),
    check('credit_term').notEmpty().isNumeric(),
    check('body_sales_quotation').notEmpty()
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