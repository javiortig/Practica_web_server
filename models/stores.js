const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize")
const { Review } = require('./reviews')

const Store = sequelize.define(
    "stores", //Nombre de la tabla
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
            unique: true
        },
        phone: {
            type: DataTypes.STRING
        },
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
        }

    },
    {
        timestamps: true
    }
)

const StoreTexts = sequelize.define(
    "store_texts", //Nombre de la tabla
    {
        content: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
)

const Photos = sequelize.define(
    "store_photos",
    {
        content: {
            type: DataTypes.STRING
        }
    }
)

Store.hasMany(StoreTexts)
Store.hasMany(Photos)

module.exports = Store