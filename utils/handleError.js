const handleHttpError = (res, message, code = 403) => {
    if (!res.headersSent) // Evita que se envien varios errores
        throw res.status(code).send(message) // throw termina la ejecucion

    
}

module.exports = { handleHttpError }