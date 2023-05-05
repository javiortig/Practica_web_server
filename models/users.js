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
        owns_company_id:{ // los usuarios que no sean merchant no tienen stores
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