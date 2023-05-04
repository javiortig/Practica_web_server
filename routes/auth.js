const express = require("express")
const router = express.Router()

const {checkRol} = require("../middleware/rol")
const authMiddleware = require("../middleware/session")
const pruebasMiddleware = require("../middleware/pruebas")

const {validatorRegisterUser, validatorRegisterMerchant, validatorLogin} = require("../validators/auth")

const {loginCtrl, registerUserCtrl, registerMerchantCtrl, updateMerchantCtrl} = require("../controllers/auth")



/*
    Estas son las rutas para todos los registros y el login
*/

// Login: POST http://localhost:3000/api/auth/login
router.post("/login", validatorLogin, loginCtrl) 

/* 
    Registro de merchant y store: POST /api/auth/merchants 
    Registro de usuario merchant y su store: registro para merchants y que solo pueda hacerlo el admin
    Nota: ambos comparten el mismo email, que se usará para que solo ese usuario o los admin puedan modificar
    esa store en concreto 
*/
router.post("/merchants", authMiddleware, checkRol(["admin"]), validatorRegisterMerchant, registerMerchantCtrl)

// Registro solo de usuarios: POST /api/auth/users 
router.post("/users", validatorRegisterUser, registerUserCtrl)


module.exports = router