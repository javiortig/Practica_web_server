const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {usersModel} = require("../models")

/**
 * Registra una store y un usuario merchant
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
        res.send(user)
        
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_USER')
    }
}


/**
 * Eliminar un usuario.
 * Los Admin pueden eliminar todos los usuarios excepto otros admins
 * Los merchants sólo pueden eliminarse a sí mismos (ten en cuenta que al tener ONDELETECASCADE si se borra
 *  el merchant, se borrará su store)
 * Los users sólo pueden eliminarse a sí mismos
 * @param {*} req 
 * @param {*} res 
 */
const deleteUserCtrl = async (req, res) => {
    try {
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

        target_user.destroy()
        res.send(user)
        
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_USER')
    }
}





module.exports = { deleteUserCtrl, updateUserCtrl }