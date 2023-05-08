const express = require("express")
const router = express.Router()

const {validatorUpdateUser, validatorGetUser, validatorDeleteUser} = require("../validators/users")

const {checkRol} = require("../middleware/rol")
const {authMiddleware} = require("../middleware/session")

const {deleteUserCtrl, updateUserCtrl, getUserCtrl, getMerchantsCtrl} = require('../controllers/users')

// Obtener la info de un usuario (Solo admin)
router.get("/id/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, getUserCtrl)

// Obtener a todos los merchants(solo admin)
router.get("/merchants", authMiddleware, checkRol(["admin"]), getMerchantsCtrl)

// Actualizar un usuario (merchants o normales)
router.put("/id/:id", authMiddleware, validatorUpdateUser, updateUserCtrl)

// Borrar un usuario (borrar tanto merchants como usuarios normales)
router.delete("/id/:id", authMiddleware, validatorDeleteUser, deleteUserCtrl)

module.exports = router