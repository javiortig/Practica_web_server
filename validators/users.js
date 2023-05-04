const { check, param } = require("express-validator")
const validateResults = require("../utils/handleValidator")


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

const validatorDeleteUser = [
    param('id').exists().notEmpty().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorUpdateWebsite, validatorUpdateMerchant, validatorDeleteUser }