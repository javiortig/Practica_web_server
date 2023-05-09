const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize")

const WebpageInterest = sequelize.define(
    "webpage_interests", //Nombre de la tabla
    {


    }, {timestamps: false}
)

module.exports = WebpageInterest