const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize")
const { Review } = require('./reviews')

const Website = sequelize.define(
    "website", //Nombre de la tabla
    {
        city:{
            type: DataTypes.STRING,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: true
        },
        summary:{
            type: DataTypes.STRING,
            allowNull: true
        },
        /*
        Cuando un usuario añade una reseña, esa reseña tiene relacion con una store,
        por lo que se incrementa scoring count
        El nuevo score se calcula con (scoring_anterior * viejo_scoring_count + nueva_valoracion)/(nuevo_scoring_count)

        Se podría calcular en base a las reviews pero esto es más rápido en caso de haber muchas reseñas
        */
        scoring:{
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        scoring_count:{ 
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        company_id:{ // los usuarios que no sean merchant no tienen stores
            type:DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        timestamps: true
    }
)

const WebsiteTexts = sequelize.define(
    "website_texts", //Nombre de la tabla
    {
        content: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
)

const WebsitePhotos = sequelize.define(
    "website_photos",
    {
        content: {
            type: DataTypes.STRING
        }
    }
)

Website.hasMany(WebsiteTexts)
Website.hasMany(WebsitePhotos)

module.exports = Website