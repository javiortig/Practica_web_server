const { matchedData } = require("express-validator")
const {handleHttpError} = require("../utils/handleError")
const {companyModel} = require("../models")



/**
 * Actualiza una empresa
 * @param {*} req 
 * @param {*} res 
 */
const updateCompanyCtrl = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)

        const target_company = await companyModel.findOne({where: {id: id}});

        if (!target_company){
            handleHttpError(res, 'COMPANY_NOT_FOUND', 404)
        }

        target_company.update(body)
        res.send(target_company)
        
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_COMPANY')
    }
}





module.exports = { updateCompanyCtrl }