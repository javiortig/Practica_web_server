const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize")
const { User } = require('./users');

const Interest = sequelize.define(
    "interests", //Nombre de la tabla
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)



module.exports = Interest