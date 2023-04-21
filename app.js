const express = require("express")
const cors = require("cors")
const morganBody = require("morgan-body")
const swaggerUi = require("swagger-ui-express")
require("dotenv").config();
// const swaggerSpecs = require("./docs/swagger")
// const loggerStream = require("./utils/handleLogger")
const { sequelize, dbConnectMySql } = require("./config/mysql")

// Esto se borra luego, es para testear. Se deberá incluir en los controllers
const { interestsModel } = require('./models/')
const { reviewsModel } = require('./models/')
const { storesModel } = require('./models/')
const { usersModel } = require('./models/')

const app = express() 

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors()) 
app.use(express.json())

//Le digo que directorio es publico
app.use(express.static("storage")) // http://localhost:3000/file.jpg

// 1.- Sniffer de todo las peticiones y respuestas
// morganBody(app, { //Para ver las distintas configuraciones que podemos pasarle en este objeto, mirad la doc en la parte de API
//     noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
//     skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
//         return res.statusCode < 400
//     },
//     stream: loggerStream
// })

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))


app.use("/api", require("./routes")) //Lee routes/index.js por defecto

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})


dbConnectMySql() 
sequelize.sync() // Crea las tablas en la base de datos si no existieran

module.exports = app

