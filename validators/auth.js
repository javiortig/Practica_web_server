const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorRegisterUser = [
    check("name").exists().notEmpty().isLength( {min:3, max: 50} ),
    check("age").exists().notEmpty().isNumeric({min: 15, max: 150}), 
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8 , max: 36}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/), // mayuscula, minuscula, digito y carácter especial obligatorio
    check("city").exists().notEmpty().isLength( {min:3, max: 100} ),
    check('interests.*').optional().isLength({ min: 1, max: 25 }),
    check('accepts_offers').exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// El registro del Admin para comenzar el registro de Merchant. Le crea por un lado un usuario merchant y 
// por otro su comercio.
const validatorRegisterMerchant = [
    check("store_name").exists().notEmpty().isLength( {min:3, max: 100} ),
    check("username").exists().notEmpty().isLength( {min:3, max: 50} ),
    check("email").exists().notEmpty().isEmail(),
    check("phone").exists().notEmpty().isMobilePhone(),
    check("address").exists().notEmpty().matches(/^[a-zA-Z0-9\s.,-]+$/),
    check("cif").exists().notEmpty().matches(/^[A-HJNP-SUVE]{1}\d{7}[0-9A-J]{1}$/),// Expresion regular del CIF
    check("password").exists().notEmpty().isLength({ min: 8 , max: 36}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
    check("city").exists().notEmpty().isLength( {min:3, max: 100} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Cuando el merchant recibe el token dado por el admin, se termina de registrar. Le obliga  a cambiar la contraseña
const validatorUpdateWebsite = [
    check("city").exists().notEmpty().isLength( {min:3, max: 100} ),
    check('interests.*').isLength({ min: 1, max: 25 }), // Es la actividad
    check("title").exists().notEmpty().isLength( {min:3, max: 100} ),
    check("summary").exists().notEmpty().isLength( {min:3, max: 100} ),
    check("password").exists().notEmpty().isLength({ min: 8 , max: 36}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
    check("texts").optional(),
    check("photos").optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// El put de Admin a /merchants/?id
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

// El login tanto de User, como Merchant, como Admin
const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorRegisterUser, validatorLogin, validatorRegisterMerchant, validatorUpdateWebsite, validatorUpdateMerchant }