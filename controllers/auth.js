const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {usersModel, companyModel, interestsModel} = require("../models")

/**
 * Encargado de hacer login del usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const user = await usersModel.findOne({where: {email: req.email}});

        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)
        
        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

/**
 * Registra un usuario normal
 * @param {*} req 
 * @param {*} res 
 */
const registerUserCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password, owns_company_id: null} 
        const dataUser = await usersModel.create(body)

        if(req.interests){
            const interestRecords = await Promise.all(req.interests.map(async (interestName) => {
                let interest = await interestsModel.findOne({
                where: { name: interestName },
                });
            
                if (!interest) {
                interest = await interestsModel.create({
                    name: interestName,
                });
                }
            
                return interest;
            }));

            interestData = await dataUser.addInterests(interestRecords)
        }

        // Esto por seguridad, ya no hace falta que viaje la password entonces la quito 
        dataUser.set('password', undefined, { strict: false }) 

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

/**
 * Registra una company y un usuario merchant
 * @param {*} req 
 * @param {*} res 
 */
const registerMerchantCtrl = async (req, res) => {
    try {
        req = matchedData(req)

        // Generamos el usuario merchant
        const password = await encrypt(req.password)
        userBody = {
            name: req.username,
            age: null,
            email: req.email,
            password: password,
            role: "merchant",
            city: req.city,
            accepts_offers: false
        }

        const dataUser = await usersModel.create(userBody)
        .catch(() =>{
            handleHttpError(res, "ERROR_USER_ALREADY_EXISTS")
        })

        // Esto por seguridad, ya no hace falta que viaje la password entonces la quito
        dataUser.set('password', undefined, { strict: false }) 

        //Generamos la company
        const CompanyBody = {
            name: req.company_name,
            cif: req.cif,
            address: req.address,
            email: req.email,
            phone: req.phone,
            city: req.city,
            title: null,
            summary: null,
            owner_id: dataUser.id
        }
        const companyData = await companyModel.create(CompanyBody)

        // Falta asignar al user creado su company, hacemos un update:

        const dataUserUpdate = await dataUser.update({owns_company_id: companyData.id})

        // Enviamos los datos de ambos
        const data = {
            token: await tokenSign(dataUser),
            user: dataUserUpdate,
            company: companyData
        }

        res.send(data) 

    }catch(err) {
        // console.log(err)
        handleHttpError(res, "ERROR_REGISTER_MERCHANT")
    }
}





module.exports = { loginCtrl, registerUserCtrl, registerMerchantCtrl }