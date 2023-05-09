const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize")

const UserInterest = sequelize.define(
    "users_interests", //Nombre de la tabla
    {


    }, {timestamps: false}
)

module.exports = UserInterest