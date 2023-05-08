const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { matchedData } = require("express-validator")
const { usersModel } = require("../models")
const { sequelize } = require("../config/mysql")

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
            return
       }
        
        const user = await usersModel.findOne({where: {id: dataToken.id}}) // findOne válido para Mongoose y Sequelize
        req.user = user // Inyecto al user en la petición

        next()

    }catch(err){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

const ownsWebpageMiddleware = async (req, res, next) => {
    try{
        const {id, user} = matchedData(req)
        // Esta query debería ser muy rápida puesto que los joins son con ids
        const query = sequelize.query(`SELECT users.id
            FROM users  
            INNER JOIN  
            companies  
            ON  
            users.id = companies.owner_id
            INNER JOIN  
            webpages  
            ON  
            webpages.company_id = companies.id
            AND webpages.id = `+ id + `;`)

        console.log(query)
        next()

    }catch(err){
        handleHttpError(res, "INTERNAL_SERVER_ERROR", 500)
    }
}

module.exports = {authMiddleware, ownsWebpageMiddleware}