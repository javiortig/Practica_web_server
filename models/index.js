
const models = {
    interestsModel: require('./interests'),
    reviewsModel: require('./reviews'),
    storesModel: require('./stores'),
    usersModel: require('./users')
}

// Creamos relaciones entre tablas
models.interestsModel.belongsToMany(models.usersModel, {through: 'users_interests'})

models.usersModel.belongsToMany(models.interestsModel, {through: 'users_interests'})

models.usersModel.hasMany(models.reviewsModel)

models.storesModel.hasMany(models.reviewsModel)

module.exports = models
