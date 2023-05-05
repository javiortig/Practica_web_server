
const express = require("express")
const router = express.Router()

const {validatorUpdateMerchant, validatorUpdateWebsite, validatorDeleteUser} = require("../validators/users")

const {checkRol} = require("../middleware/rol")
const authMiddleware = require("../middleware/session")

const {deleteUserCtrl, updateMerchantCtrl} = require('../controllers/users')


// TODO Obtener a todos los clientes de su ciudad que reciben ofertas:
router.get("/clients")

// TODO Obtener a todos los clientes de la ciudad por parámetro que reciben ofertas:
router.get("/clients/id/:id")



module.exports = router