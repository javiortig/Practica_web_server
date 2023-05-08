
const express = require("express")
const router = express.Router()

const {validatorCreateWebpage, validatorUpdateWebpage} = require("../validators/webpages")

const {checkRol} = require("../middleware/rol")
const {authMiddleware, ownsWebpageMiddleware} = require("../middleware/session")

const {createWebpageCtrl, updateWebpageCtrl} = require('../controllers/webpages')

// TODO Obtener a todos los clientes de su ciudad que reciben ofertas:
router.get("/clients")

// TODO Obtener a todos los clientes de la ciudad por parámetro que reciben ofertas:
router.get("/clients/id/:id")

// Crear una página web para la compañía
router.post("/", authMiddleware, checkRol(["merchant"]), validatorCreateWebpage, createWebpageCtrl)

// Modificar una página web existente(pueden hacerlo tanto el merchant comoun admin)
router.put("/:id", authMiddleware, checkRol(["admin", "merchant"]), validatorUpdateWebpage, ownsWebpageMiddleware, updateWebpageCtrl)

module.exports = router