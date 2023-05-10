const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize")
const { Review } = require('./reviews')

const Company = sequelize.define(
    "company", //Nombre de la tabla
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        cif: {
            type: DataTypes.CHAR(9), // Validaciones en los middleware
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            // unique: true Mismo problema que con el email en users
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type:DataTypes.INTEGER,
            allowNull: false
        }
    })
module.exports = Company