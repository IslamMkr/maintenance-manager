const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'maintenance_manager',
    'root',
    'mokraisl',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

module.exports = sequelize