const express = require("express")
const router = express.Router()

const {validatorUpdateMerchant, validatorUpdateWebsite, validatorDeleteUser} = require("../validators/users")

const {checkRol} = require("../middleware/rol")
const authMiddleware = require("../middleware/session")

const {deleteUserCtrl, updateMerchantCtrl} = require('../controllers/users')

module.exports = router