const jwt = require("jsonwebtoken")

/**
 * El objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "4h"
        }
    )
    return sign
}

/**
 * Token se sesión
 * @param {*} tokenJwt 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

module.exports = { tokenSign, verifyToken }