const { matchedData } = require("express-validator")
const {handleHttpError} = require("../utils/handleError")
const {usersModel, webpageModel, interestsModel, reviewsModel} = require("../models")


/**
 * devuelve todas las paginas
 * @param {*} req 
 * @param {*} res 
 */
const getWebpagesCtrl = async (req, res) => {
    try {
        const webpages = await webpageModel.findAll();

        if (!webpages){
            handleHttpError(res, 'NO_PAGES_AVAILABLE', 404)
        }

        res.send(webpages)
        
    }catch(err){
        handleHttpError(res, 'ERROR_GET_USER')
    }
}

/**
 * devuelve una pagina especifica
 * @param {*} req 
 * @param {*} res 
 */
const getWebpageCtrl = async (req, res) => {
    try {
        const {webpage_id} = matchedData(req)
        const webpage = await webpageModel.findOne({where: {id: webpage_id}});

        if (!webpage){
            handleHttpError(res, 'NOT FOUND', 404)
        }

        res.send(webpage)
        
    }catch(err){
        handleHttpError(res, 'ERROR_GET_USER')
    }
}

/**
 * devuelve una lista de paginas por ciudad y por actividad(opcional)
 * @param {*} req 
 * @param {*} res 
 */
const getWebpageByCityActivityCtrl = async (req, res) => {
    try {
        const {city, activity} = matchedData(req)
        let webpages = null;
        // Si no hay activity, buscar solo por ciudad, sino por ambas
        if (activity){
            webpages = await webpageModel.findAll({
                include: [
                  {
                    model: interestsModel,
                    through: { attributes: [] }, // excluye la tabla intermedia 
                    required: true ,// inner join
                    where:{name: activity}
                  }
                ]
              });
        }
        else{
            webpages = await webpageModel.findAll({where: {city: city}})
        }

        if (!webpage){
            handleHttpError(res, 'NOT FOUND', 404)
        }

        res.send(webpage)
        
    }catch(err){
        handleHttpError(res, 'ERROR_GET_USER')
    }
}


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
        const {...body} = matchedData(req)

        const target_webpage = req.webpage;

        if (!target_webpage){
            handleHttpError(res, 'WEBPAGE_NOT_FOUND', 404)
        }

        target_webpage.update(body)
        res.send(target_webpage)
        
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_WEBPAGE')
    }
}

/**
 * Genera una review, ya sea sólo una score con o sin texto
 * @param {*} req 
 * @param {*} res 
 */
const createReviewCtrl = async (req, res) => {
    try {
        const user = req.user;
        const {webpage_id, content, score} = matchedData(req)

        let target_webpage = await webpageModel.findOne({where: {id: webpage_id}});
        if (!target_webpage){
            handleHttpError(res, 'WEBPAGE_NOT_FOUND', 404)
        }

        // Creamos la review
        const review = await reviewsModel.create({
            score: score,
            content: (content)? content : null,
            webpage_id: webpage_id,
            user_id: user.id
        })

        // Modificamos el score de la pagina tras esta review
        const new_scoring = (target_webpage.scoring * target_webpage.scoring_count + score)/(target_webpage.scoring_count + 1)
        const new_scoring_count = target_webpage.scoring_count + 1

        await target_webpage.update({scoring: new_scoring, scoring_count: new_scoring_count})

        res.send(review)
        
    }catch(err){
        handleHttpError(res, 'ERROR_CREATING_REVIEW')
    }
}



module.exports = { createWebpageCtrl, updateWebpageCtrl, getWebpagesCtrl, getWebpageCtrl, getWebpageByCityActivityCtrl, createReviewCtrl}