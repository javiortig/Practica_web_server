const express = require("express")
const router = express.Router()

const {validatorRegisterUser, validatorRegisterMerchant} = require("../validators/auth")

const checkRol = require("../middleware/rol")
const authMiddleware = require("../middleware/session")

const {registerCtrl, foo} = require('../controllers/users')

// Login: POST http://localhost:3000/api/auth/login
router.post("/login", validatorLogin, loginCtrl) 

module.exports = router