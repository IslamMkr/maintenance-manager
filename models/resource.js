const DataTypes = require('sequelize')

const sequelize = require('../util/database')

// Resource Model
const Resource = sequelize.define(
    'resource',
    {
        rid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'uid'
            }
        },
        resourceName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        localisation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

Resource.sync({ force:true })

module.exports = Resource