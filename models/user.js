const DataTypes = require('sequelize')

const sequelize = require('../util/database')

// User Model
const User = sequelize.define(
    'user',
    {
        uid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userRole: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['AD', 'RM']]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

module.exports = User