const { check, param } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorGetUser = [
    param('id').exists().notEmpty().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateMerchant = [
    check("name").optional().notEmpty().isLength( {min:3, max: 50} ),
    //check("email").optional().notEmpty().isEmail(),
    check("phone").optional().notEmpty().isMobilePhone(),
    check("address").optional().notEmpty().matches(/^[a-zA-Z0-9\s.,-]+$/),
    check("cif").optional().notEmpty().matches(/^[A-HJNP-SUVE]{1}\d{7}[0-9A-J]{1}$/),// Expresion regular del CIF
    check("city").optional().notEmpty().isLength( {min:3, max: 100} ),
    check('interests.*').optional().isLength({ min: 1, max: 25 }), // Es la actividad
    check("title").optional().notEmpty().isLength( {min:3, max: 100} ),
    check("summary").optional().notEmpty().isLength( {min:3, max: 100} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateUser = [
    param('id').exists().notEmpty().isNumeric(),
    check("name").optional().notEmpty().isLength( {min:3, max: 50} ),
    check("age").optional().notEmpty().isNumeric({min: 15, max: 150}), 
    check("email").optional().notEmpty().isEmail(),
    check("password").optional().notEmpty().isLength({ min: 8 , max: 36}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/), // mayuscula, minuscula, digito y carácter especial obligatorio
    check("city").optional().notEmpty().isLength( {min:3, max: 100} ),
    check('interests.*').optional().isLength({ min: 1, max: 25 }),
    check('accepts_offers').optional().notEmpty().isBoolean(),
    check('owns_company_id').not().exists().withMessage('`owns_company_id` field not allowed'),
    check('role').not().exists().withMessage('`role` field not allowed'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDeleteUser = [
    param('id').exists().notEmpty().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorUpdateMerchant, validatorDeleteUser, validatorUpdateUser,
    validatorGetUser }