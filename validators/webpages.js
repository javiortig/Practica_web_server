const { check, param } = require("express-validator")
const validateResults = require("../utils/handleValidator")


// Cuando el merchant recibe el token dado por el admin, se termina de registrar. Le obliga  a cambiar la contraseña
const validatorCreateWebpage = [
    check("city").exists().notEmpty().isLength( {min:3, max: 100} ),
    check('interests.*').exists().isLength({ min: 1, max: 25 }), // Es la actividad
    check("title").exists().notEmpty().isLength( {min:3, max: 100} ),
    check("summary").exists().notEmpty().isLength( {min:3, max: 100} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateWebpage = [
    param('webpage_id').exists().notEmpty().isNumeric(),
    check("city").optional().notEmpty().isLength( {min:3, max: 100} ),
    check('interests.*').not().exists().withMessage('`interests` field not allowed'), // Me pego un tiro antes que hacer esto
    check("title").optional().notEmpty().isLength( {min:3, max: 100} ),
    check("summary").optional().notEmpty().isLength( {min:3, max: 100} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetWebpage = [
    param('webpage_id').exists().notEmpty().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorgetWebpageByCityActivity = [
    check("city").exists().notEmpty().isLength( {min:3, max: 100} ),
    check('activity').optional().isLength( {min:2, max: 50} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateReview = [
    param('webpage_id').exists().notEmpty().isNumeric(),
    check("content").optional().notEmpty().isLength( {min:3, max: 10000} ),
    check('score').exists().isInt({ min: 0, max: 5 }).withMessage('`score` must be an integer between 0 and 5'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateWebpage, validatorUpdateWebpage, validatorGetWebpage, validatorgetWebpageByCityActivity, validatorCreateReview}