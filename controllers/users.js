const { matchedData } = require("express-validator")
const {handleHttpError} = require("../utils/handleError")
const {usersModel} = require("../models")

/**
 * Registra una company y un usuario merchant
 * @param {*} req 
 * @param {*} res 
 */
const getUserCtrl = async (req, res) => {
    try {
        const {id} = matchedData(req)

        const target_user = await usersModel.findOne({where: {id: id}});

        if (!target_user){
            handleHttpError(res, 'USER_NOT_FOUND', 404)
        }

        res.send(target_user)
        
    }catch(err){
        handleHttpError(res, 'ERROR_GET_USER')
    }
}

/**
 * Registra una company y un usuario merchant
 * @param {*} req 
 * @param {*} res 
 */
const getMerchantsCtrl = async (req, res) => {
    try {
        const target_users = await usersModel.findAll({where: {role: "merchant"}})

        res.send(target_users)
        
    }catch(err){
        handleHttpError(res, 'ERROR_GET_MERCHANTS')
    }
}

/**
 * Actualiza un usuario(excepto admin)
 * @param {*} req 
 * @param {*} res 
 */
const updateUserCtrl = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const user = req.user

        const target_user = await usersModel.findOne({where: {id: id}});

        if (!target_user){
            handleHttpError(res, 'USER_NOT_FOUND', 404)
        }

        // Un switch con todos los casos que no se pueden permitir, en cualquier otro caso se permite
        switch (target_user.role) {
            case "admin":   // los admin solo se modifican en la propia
                handleHttpError(res, 'UPDATE_FORBIDDEN', 403) 
                break;
        
            case "merchant":    // solo si eres tu mismo o eres admin
                if (user.role == "user" || (user.role == "merchant" && user.id != target_user.id)){
                    handleHttpError(res, 'UNAUTHORIZED', 401) 
                }
                break;

            case "user":        // solo si eres tu mismo o eres admin
                if (user.role == "merchant" || (user.role == "user" && user.id != target_user.id)){
                    handleHttpError(res, 'UNAUTHORIZED', 401) 
                }
                break;
            default:
                handleHttpError(res, 'ERROR_UPDATE_USER', 500)
                break;
        }

        target_user.update(body)
        res.send(target_user)
        
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_USER')
    }
}


/**
 * Eliminar un usuario.
 * Los Admin pueden eliminar todos los usuarios excepto otros admins
 * Los merchants sólo pueden eliminarse a sí mismos (ten en cuenta que al tener ONDELETECASCADE si se borra
 *  el merchant, se borrará su company)
 * Los users sólo pueden eliminarse a sí mismos
 * @param {*} req 
 * @param {*} res 
 */
const deleteUserCtrl = async (req, res) => {
    try {
        console.log("ENTRO DELETE")
        const {id} = matchedData(req)
        const user = req.user
        const target_user = await usersModel.findOne({where: {id: id}});

        if (!target_user){
            handleHttpError(res, 'USER_NOT_FOUND', 404)
        }

        // Un switch con todos los casos que no se pueden permitir, en cualquier otro caso se permite
        switch (target_user.role) {
            case "admin":
                handleHttpError(res, 'DELETE_FORBIDDEN', 403) 
                break;
        
            case "merchant":
                if (user.role == "user" || (user.role == "merchant" && user.id != target_user.id)){
                    handleHttpError(res, 'UNAUTHORIZED', 401) 
                }
                break;

            case "user":
                if (user.role == "merchant" || (user.role == "user" && user.id != target_user.id)){
                    handleHttpError(res, 'UNAUTHORIZED', 401) 
                }
                break;
            default:
                handleHttpError(res, 'ERROR_DELETE_USER', 500)
                break;
        }

        console.log("llego a destroy()")
        const result = target_user.destroy()
        console.log("result")
        console.log(result)
        res.send(result)
        
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_USER')
    }
}


/**
 * Devuelve todos los clientes que reciben ofertas de una página
 * @param {*} req 
 * @param {*} res 
 */
const getClientsCtrl = async (req, res) => {
    try {
        const {webpage} = matchedData(req)

        const clients = await usersModel.findAll({where: {city: webpage.city}});

        res.send(clients)
        
    }catch(err){
        handleHttpError(res, 'ERROR_GET_USER')
    }
}


module.exports = { deleteUserCtrl, updateUserCtrl, getUserCtrl, getMerchantsCtrl, getClientsCtrl }