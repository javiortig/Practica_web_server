const express = require("express")
const router = express.Router()

const {checkRol} = require("../middleware/rol")
const {authMiddleware} = require("../middleware/session")
const pruebasMiddleware = require("../middleware/pruebas")

const {validatorRegisterUser, validatorRegisterMerchant, validatorLogin} = require("../validators/auth")

const {loginCtrl, registerUserCtrl, registerMerchantCtrl, updateMerchantCtrl} = require("../controllers/auth")



/*
    Estas son las rutas para todos los registros y el login
*/

// Login: POST http://localhost:3000/api/auth/login
router.post("/login", validatorLogin, loginCtrl) 

/* 
    POST /api/auth/merchant 
    Registro de usuario merchant y su company: registro para merchants y que solo pueda hacerlo el admin
    Nota: ambos comparten el mismo email y una FK
*/
router.post("/merchant", authMiddleware, checkRol(["admin"]), validatorRegisterMerchant, registerMerchantCtrl)

// Registro solo de usuarios: POST /api/auth/users 
router.post("/users", validatorRegisterUser, registerUserCtrl)


module.exports = router