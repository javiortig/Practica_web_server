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
const updateMerchantCtrl = async (req, res) => {
    try {
        const {id} = req.params;
        const {...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        const data = await storesModel.findOne({where: {id: id}});

        if(!data){
            handleHttpError(res, "STORE_NOT_EXISTS", 404)
            return
        }
        
        const update = await data.update(body)

        res.send(update)    
    }catch(err){
        console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_MERCHANT')
    }
}


/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteUserCtrl = async (req, res) => {
    try {
        const {id, user} = matchedData(req)
        //const data = await tracksModel.deleteOne({_id:id}); // "deleteOne" realiza el borrado físico en la BD
        // const data = await tracksModel.delete({_id:id}); // "delete" realiza el borrado lógico
        // res.send(data) 

        console.log("DELETE USER:")
        console.log(user.role, id)
        
        res.send(user)
        
    }catch(err){
        //console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}





module.exports = { deleteUserCtrl, updateMerchantCtrl }