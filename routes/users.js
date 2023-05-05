const express = require("express")
const router = express.Router()

const {validatorUpdateUser, validatorUpdateWebsite, validatorDeleteUser} = require("../validators/users")

const {checkRol} = require("../middleware/rol")
const authMiddleware = require("../middleware/session")

const {deleteUserCtrl, updateUserCtrl} = require('../controllers/users')



// Actualizar un usuario (merchants o normales)
router.put("/:id", authMiddleware, validatorUpdateUser, updateUserCtrl)

// Borrar un usuario (borrar tanto merchants como usuarios normales)
router.delete("/:id", authMiddleware, validatorDeleteUser, deleteUserCtrl)



module.exports = router