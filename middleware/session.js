const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { usersModel } = require("../models")

const authMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop() 

        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            retrun
       }
        
        const query = {
            // _id o id 
            ["id"]: dataToken["id"]
        }

        const user = await usersModel.findOne(query) // findOne válido para Mongoose y Sequelize
        req.user = user // Inyecto al user en la petición

        next()

    }catch(err){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = authMiddleware