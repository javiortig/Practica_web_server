const express = require("express")
const router = express.Router()

const {validatorUpdateMerchant, validatorUpdateWebsite, validatorDeleteUser} = require("../validators/users")

const {checkRol} = require("../middleware/rol")
const authMiddleware = require("../middleware/session")

const {deleteUserCtrl, updateMerchantCtrl} = require('../controllers/users')

// TODO:
//router.put("/:id", authMiddleware, checkRol(["admin"]), validatorUpdateMerchant, updateMerchantCtrl)

// TODO: borrar una store (borrará su usuario asociado tambien)
//router.delete("/:id", authMiddleware, validatorDeleteUser, deleteUserCtrl)

module.exports = router