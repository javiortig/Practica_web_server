const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize")
const { Interests } = require('./interests');
const { Review}  = require('./reviews')

const User = sequelize.define(
    "users", //Nombre de la tabla
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
/*
    IMPORTANTE: sequelize por lo que sea no detecta que ya existe la key, por lo que cada vez que lo ejecuto
    me la vuelve a crear y cuando ejecuto el server 64 veces me da MAX_KEY_ERROR, por lo que no me queda otra
    que ponerlo en false aunque debería de ser unique (si no tengo que borrar la DB cada dos por tres).
    La solucion que he encontrado en github es añadir los indices abajo:
*/
            //unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.ENUM,
            values: ["user", "merchant", "admin"],
            defaultValue: "user"
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accepts_offers: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        owns_store_id:{ // los usuarios que no sean merchant no tienen stores
            type:DataTypes.INTEGER,
            allowNull: true
        }

    },
    {
        // Esto tampoco funciona, sigue haciendo lo mismo...
        // indexes: [{unique:true, fields: ['email']}]
    },
    {
        timestamps: true
    }
)

module.exports = User