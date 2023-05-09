const express = require("express")
const router = express.Router()

const {validatorUpdateMerchant, validatorDeleteUser} = require("../validators/users")

const {checkRol} = require("../middleware/rol")
const {authMiddleware, ownsCompanyMiddleware} = require("../middleware/session")

const {deleteUserCtrl, updateMerchantCtrl} = require('../controllers/users')


// Modificar los datos de una compañía existente. Lo puede hacer tanto un admin como su dueño
router.put("/:id", authMiddleware, checkRol(["admin", "merchant"]), ownsCompanyMiddleware, , )


module.exports = router