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

const {validatorUpdateMerchant, validatorUpdateWebsite, validatorDeleteUser} = require("../validators/users")

const {checkRol} = require("../middleware/rol")
const authMiddleware = require("../middleware/session")

const {deleteUserCtrl, updateMerchantCtrl} = require('../controllers/users')


// TODO
//router.get("/:city")

//TODO: PUT USER: validator logeado y controller
//router.put("/:id")

//TODO: DELETE USER: logeado y controller
//router.delete("/:id")

// Modificar merchant:
router.put("/merchants/:id", authMiddleware, checkRol(["admin"]), validatorUpdateMerchant, updateMerchantCtrl)

// Borrar un usuario (borrar tanto merchants como usuarios normales)
router.delete("/users/:id", authMiddleware, validatorDeleteUser, deleteUserCtrl)

module.exports = router