// const express = require("express")
// const { registerCtrl, loginCtrl, makeAdminCtrl } = require("../controllers/auth")
// const {validatorRegister, validatorLogin, validatorMakeAdmin} = require("../validators/auth")
// const router = express.Router()
// const checkRol = require("../middleware/rol")
// const authMiddleware = require("../middleware/session")


// //POST http://localhost:3000/api/auth/register
// router.post("/register", validatorRegister, registerCtrl)

// //POST http://localhost:3000/api/auth/login
// router.post("/login", validatorLogin, loginCtrl) 

// //PUT http://localhost:3000/api/auth/makeAdmin
// router.put("/makeAdmin", authMiddleware, checkRol(["admin"]), validatorMakeAdmin, makeAdminCtrl)

// module.exports = router


const express = require("express")
const router = express.Router()

const {validatorRegisterUser} = require("../validators/auth")

const checkRol = require("../middleware/rol")
const authMiddleware = require("../middleware/session")

const {} = require('../controllers/users')


// TODO
//router.get("/:city")

//TODO: PUT USER: validator logeado y controller
//router.put("/:id")

//TODO: DELETE USER: logeado y controller
//router.delete("/:id")

module.exports = router