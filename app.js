const express = require("express")
const cors = require("cors")
const morganBody = require("morgan-body")
const swaggerUi = require("swagger-ui-express")
require("dotenv").config();
const swaggerSpecs = require("./docs/swagger")
const loggerStream = require("./utils/handleLogger")
const { sequelize, dbConnectMySql } = require("./config/mysql")

/*
    LISTA DE TODO POR ORDEN DE IMPORTANCIA:
    - Dejar Swagger funcionando. (mirar apuntes).
    - Pruebas automaticas con Jest.
    - Probar que las imagenes y tal funcionen, tanto al subirlas, actualizar... como al get de las paginas que devuelva las urls
    - Añadir que ordene las webpages por score

    - En consecuencia al punto 3, añadir un endpoint para borrar imagenes
*/

// Esto se borra luego, es para testear. Se deberá incluir en los controllers
const { interestsModel } = require('./models/')
const { reviewsModel } = require('./models/')
const { companyModel } = require('./models/')
const { usersModel } = require('./models/')

const app = express() 

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors()) 
app.use(express.json())

// //Le digo que directorio es publico
// app.use(express.static("storage")) // http://localhost:3000/file.jpg

// 1.- Sniffer de todo las peticiones y respuestas
morganBody(app, { //Para ver las distintas configuraciones que podemos pasarle en este objeto, mirad la doc en la parte de API
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
})

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))


app.use("/api", require("./routes")) //Lee routes/index.js por defecto

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})


dbConnectMySql() 
sequelize.sync({alter: true})// Crea las tablas en la base de datos si no existieran

module.exports = app

