
const express = require("express")
const router = express.Router()

const {validatorCreateWebpage, validatorUpdateWebpage, validatorGetWebpage, validatorgetWebpageByCityActivity, validatorCreateReview} = require("../validators/webpages")

const {checkRol} = require("../middleware/rol")
const {authMiddleware, ownsWebpageMiddleware} = require("../middleware/session")

const {createWebpageCtrl, updateWebpageCtrl, getWebpagesCtrl, getWebpageCtrl, getWebpageByCityActivityCtrl, createReviewCtrl} = require('../controllers/webpages')

// Devuelve todas las paginas
router.get("/", getWebpagesCtrl)

// Devuelve una página específica
router.get("/:id", validatorGetWebpage,getWebpageCtrl)

// Devuelve todas las paginas de una ciudad
router.get("/search/:city", validatorgetWebpageByCityActivity,getWebpageByCityActivityCtrl)

// Devuelve todas las páginas de una ciudad filtradas por actividad
router.get("/search/:city/:activity", validatorgetWebpageByCityActivity,getWebpageByCityActivityCtrl)


// TODO Obtener a todos los clientes de su ciudad que reciben ofertas:
//router.get("/clients/:webpage_id", ownsWebpageMiddleware) //MOVER A USERS ??

// Crear una página web para la compañía
router.post("/", authMiddleware, checkRol(["merchant"]), validatorCreateWebpage, createWebpageCtrl)

// Modificar una página web existente(pueden hacerlo tanto el merchant comoun admin)
router.put("/:id", authMiddleware, checkRol(["admin", "merchant"]), validatorUpdateWebpage, ownsWebpageMiddleware, updateWebpageCtrl)

// Crea una review (una review puede consistir sólo en una score, sin texto)
router.patch("/:id", authMiddleware, checkRol(["user"]), validatorCreateReview,createReviewCtrl)

module.exports = router