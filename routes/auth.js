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

/**
 * @openapi
 * /api/auth/merchant:
 *  post:
 *      tags:
 *      - User
 *      summary: Merchant User register
 *      description: Register a new merchant user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/merchant", authMiddleware, checkRol(["admin"]), validatorRegisterMerchant, registerMerchantCtrl)

// Registro solo de usuarios: POST /api/auth/users 
router.post("/users", validatorRegisterUser, registerUserCtrl)


module.exports = router