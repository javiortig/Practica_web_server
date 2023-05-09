const { model } = require('mongoose')

const models = {
    interestsModel: require('./interests'),
    reviewsModel: require('./reviews'),
    companyModel: require('./company'),
    usersModel: require('./users'),
    webpageModel: require('./webpages'),
    userInterestModel: require('./users_interests'),
    WebpageInterestModel: require('./webpage_interests'),
}

// Creamos relaciones entre tablas
models.interestsModel.belongsToMany(models.usersModel, {through: models.userInterestModel})

models.interestsModel.belongsToMany(models.webpageModel, {through: models.WebpageInterestModel})


models.webpageModel.belongsToMany(models.interestsModel, {through: models.WebpageInterestModel})

models.webpageModel.hasMany(models.reviewsModel)

models.companyModel.belongsTo(models.usersModel, {foreignKey: 'owner_id',as: 'owner', onDelete: 'CASCADE'})


models.usersModel.hasMany(models.reviewsModel)

models.usersModel.belongsToMany(models.interestsModel, {through: models.userInterestModel})

models.usersModel.belongsTo(models.companyModel, {foreignKey: 'owns_company_id', as: 'owns_company', onDelete: 'CASCADE'})

models.webpageModel.belongsTo(models.companyModel, {foreignKey: 'company_id', as: 'company'})

module.exports = models
