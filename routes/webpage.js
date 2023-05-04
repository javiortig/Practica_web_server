const express = require("express")
const router = express.Router()

const {checkRol} = require("../middleware/rol")
const authMiddleware = require("../middleware/session")
const pruebasMiddleware = require("../middleware/pruebas")




module.exports = router