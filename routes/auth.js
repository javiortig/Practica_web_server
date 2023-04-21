// const express = require("express")
// const { registerCtrl, loginCtrl, makeAdminCtrl } = require("../controllers/auth")
// const {validatorRegister, validatorLogin, validatorMakeAdmin} = require("../validators/auth")
// const router = express.Router()
// const checkRol = require("../middleware/rol")
// const authMiddleware = require("../middleware/session")

const express = require("express")
const router = express.Router()

//POST http://localhost:3000/api/auth/register
router.post("/register", validatorRegister, registerCtrl)

// //POST http://localhost:3000/api/auth/login
// router.post("/login", validatorLogin, loginCtrl) 

// //PUT http://localhost:3000/api/auth/makeAdmin
// router.put("/makeAdmin", authMiddleware, checkRol(["admin"]), validatorMakeAdmin, makeAdminCtrl)

module.exports = router
