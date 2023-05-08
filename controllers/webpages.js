const { matchedData } = require("express-validator")
const {handleHttpError} = require("../utils/handleError")
const {usersModel, webpageModel, interestsModel} = require("../models")

/**
 * Registra una company y un usuario merchant
 * @param {*} req 
 * @param {*} res 
 */
const createWebpageCtrl = async (req, res) => {
    try {
        let {...body} = matchedData(req)
        const user = req.user

        body.company_id = user.owns_company_id

        // Guardamos los intereses en sus respectivas arrays
        let temp_interests = []
        body.interests.forEach(interest => {
            temp_interests.push({
                name: interest,
                webpage_interests:{
                    selfGranted: true
                }
            });
        });
        body.interests = temp_interests
        
        console.log(body)

        const dataWebpage = await webpageModel.create(body)

        /*
        // En la tabla de intereses, se insertan nuevos si estos no existen
        const interest_bulk_array = body.interests.map((name) => ({ name }))
        const interests = interestsModel.bulkCreate(interest_bulk_array)

        // Ahora insertamos en la tabla webpage_interests las relaciones entre intereses y webpages
        let n_n_interests_bulk_array = []
        body.interests.forEach(interest => {
            n_n_interests_bulk_array.push(
                {
                    interestName: interest,
                    webpageId: dataWebpage.id
                }
            )
        });
        */


        res.send(dataWebpage)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_WEBPAGE")
    }
}

/**
 * Registra una company y un usuario merchant
 * @param {*} req 
 * @param {*} res 
 */
const updateWebpageCtrl = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)

        const target_webpage = await webpageModel.findOne({where: {id: id}});

        if (!target_webpage){
            handleHttpError(res, 'WEBPAGE_NOT_FOUND', 404)
        }

        target_webpage.update(body)
        res.send(target_webpage)
        
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_WEBPAGE')
    }
}



module.exports = { createWebpageCtrl, updateWebpageCtrl}