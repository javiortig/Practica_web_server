const { model } = require('mongoose')

const models = {
    interestsModel: require('./interests'),
    reviewsModel: require('./reviews'),
    companyModel: require('./company'),
    usersModel: require('./users'),
    websiteModel: require('./website')
}

// Creamos relaciones entre tablas
models.interestsModel.belongsToMany(models.usersModel, {through: 'users_interests'})

models.interestsModel.belongsToMany(models.websiteModel, {through: 'webpage_interests'})


models.websiteModel.belongsToMany(models.interestsModel, {through: 'webpage_interests'})

models.websiteModel.hasMany(models.reviewsModel)

models.companyModel.belongsTo(models.usersModel, {foreignKey: 'owner_id',as: 'owner', onDelete: 'CASCADE'})


models.usersModel.hasMany(models.reviewsModel)

models.usersModel.belongsToMany(models.interestsModel, {through: 'users_interests'})

models.usersModel.belongsTo(models.companyModel, {foreignKey: 'owns_company_id', as: 'owns_company', onDelete: 'CASCADE'})

models.websiteModel.belongsTo(models.companyModel, {foreignKey: 'company_id', as: 'company'})

module.exports = models
