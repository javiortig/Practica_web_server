const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { usersModel } = require("../models")

const pruebasMiddleware = async (req, res, next) => {
    try{
        console.log("Entro en las pruebas")
        next()

    }catch(err){
        handleHttpError(res, "ERROR_PRUEBAS", 500)
    }
}

module.exports = pruebasMiddleware