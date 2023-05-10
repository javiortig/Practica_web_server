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

models.webpageModel.hasMany(models.reviewsModel, {foreignKey: 'webpage_id', as: 'webpage'})



models.companyModel.belongsTo(models.usersModel, {foreignKey: 'owner_id',as: 'owner', onDelete: 'CASCADE'})

models.companyModel.hasMany(models.webpageModel)



models.usersModel.hasMany(models.reviewsModel, {foreignKey: 'user_id', as: 'user'})

models.usersModel.belongsToMany(models.interestsModel, {through: models.userInterestModel})

models.usersModel.belongsTo(models.companyModel, {foreignKey: 'owns_company_id', as: 'owns_company', onDelete: 'CASCADE'})

models.webpageModel.belongsTo(models.companyModel, {foreignKey: 'company_id', as: 'company'})



models.reviewsModel.belongsTo(models.usersModel, {foreignKey: 'user_id', as: 'user'})

models.reviewsModel.belongsTo(models.webpageModel, {foreignKey: 'webpage_id', as: 'webpage'})

module.exports = models
