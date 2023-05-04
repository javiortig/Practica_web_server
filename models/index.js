
const models = {
    interestsModel: require('./interests'),
    reviewsModel: require('./reviews'),
    storesModel: require('./stores'),
    usersModel: require('./users')
}

// Creamos relaciones entre tablas
models.interestsModel.belongsToMany(models.usersModel, {through: 'users_interests'})

models.interestsModel.belongsToMany(models.storesModel, {through: 'stores_interests'})


models.storesModel.belongsToMany(models.interestsModel, {through: 'stores_interests'})

models.storesModel.hasMany(models.reviewsModel)

models.storesModel.belongsTo(models.usersModel, {foreignKey: 'owner_id',as: 'owner', onDelete: 'CASCADE'})


models.usersModel.hasMany(models.reviewsModel)

models.usersModel.belongsToMany(models.interestsModel, {through: 'users_interests'})

models.usersModel.belongsTo(models.storesModel, {foreignKey: 'owns_store_id', as: 'owns_store', onDelete: 'CASCADE'})

module.exports = models
