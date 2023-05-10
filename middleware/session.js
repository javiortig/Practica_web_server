const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { matchedData } = require("express-validator")
const { usersModel, webpageModel, companyModel } = require("../models")
const { sequelize } = require("../config/mysql")

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop()

        const dataToken = await verifyToken(token)

        if (!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        const user = await usersModel.findOne({ where: { id: dataToken.id } }) // findOne válido para Mongoose y Sequelize
        req.user = user // Inyecto al user en la petición

        if (!user) {
            handleHttpError(res, "USER_AUTH_NOT_FOUND", 404)
        }

        next()

    } catch (err) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

const ownsWebpageMiddleware = async (req, res, next) => {
    try {
        const user = req.user;
        const { webpage_id } = matchedData(req)

        const webpage = await webpageModel.findOne({ where: { id: webpage_id } })

        if (!webpage) {
            handleHttpError(res, "WEBPAGE_AUTH_NOT_FOUND", 404)
        }

        if (user.role != "admin") {
            const company = await companyModel.findOne({where: {id: webpage.company_id}});

            if (!company || (company.owner_id != user.id)){
                handleHttpError(res, "USER_NOT_OWN_WEBPAGE", 403)
            }

            console.log("Entro 4")

        }

        req.webpage = webpage // Inyecto la webpage en la petición

        next()

    } catch (err) {
        handleHttpError(res, "INTERNAL_SERVER_ERROR", 500)
    }
}

const ownsCompanyMiddleware = async (req, res, next) => {
    try {
        if (user.role != "admin") {
            const { company_id, user } = matchedData(req)

            if (user.owns_company_id != company_id) {
                handleHttpError(res, "USER_NOT_OWNS_COMPANY", 403)
            }
        }


        next()

    } catch (err) {
        handleHttpError(res, "INTERNAL_SERVER_ERROR", 500)
    }
}

module.exports = { authMiddleware, ownsWebpageMiddleware, ownsCompanyMiddleware }