const { check, param } = require("express-validator")
const validateResults = require("../utils/handleValidator")


const validatorUpdateCompany= [
    param('id').exists().notEmpty().isNumeric(),
    check('owner_id').not().exists().withMessage('`owner_id` field not allowed'),
    check("name").optional().notEmpty().isLength( {min:3, max: 50} ),
    //check("email").optional().notEmpty().isEmail(),
    check("phone").optional().notEmpty().isMobilePhone(),
    check("address").optional().notEmpty().matches(/^[a-zA-Z0-9\s.,-]+$/),
    check("cif").optional().notEmpty().matches(/^[A-HJNP-SUVE]{1}\d{7}[0-9A-J]{1}$/),// Expresion regular del CIF
    check("name").optional().notEmpty().isLength( {min:3, max: 50} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]



module.exports = { validatorUpdateCompany }