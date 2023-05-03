const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {usersModel, storesModel} = require("../models")

/**
 * Encargado de hacer login del usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({ email: req.email })
        console.log("User:")
        console.log(user)

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
        const body = {...req, password} 
        const dataUser = await usersModel.create(body)

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
 * Registra una store y un usuario merchant
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

        // Esto por seguridad, ya no hace falta que viaje la password entonces la quito
        dataUser.set('password', undefined, { strict: false }) 

        //Generamos el store
        storeBody = {
            name: req.store_name,
            cif: req.cif,
            address: req.address,
            email: req.email,
            phone: req.phone,
            city: req.city,
            title: null,
            summary: null,
        }
        const storeData = await storesModel.create(storeBody)

        // Enviamos los datos de ambos
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser,
            store: storeData
        }

        res.send(data) 

    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_MERCHANT")
    }
}



module.exports = { loginCtrl, registerUserCtrl, registerMerchantCtrl }