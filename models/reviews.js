const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize")

const Review = sequelize.define(
    "review", //Nombre de la tabla
    {
        score:{
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        content:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = Review