const express = require("express")
const router = express.Router()

const {validatorUpdateCompany} = require("../validators/companies")

const {checkRol} = require("../middleware/rol")
const {authMiddleware, ownsCompanyMiddleware} = require("../middleware/session")

const {deleteUserCtrl, updateMerchantCtrl} = require('../controllers/companies')


// Modificar los datos de una compañía existente. Lo puede hacer tanto un admin como su dueño
router.put("/:id", authMiddleware, checkRol(["admin", "merchant"]), ownsCompanyMiddleware, validatorUpdateCompany, )


module.exports = router