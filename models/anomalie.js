const DataTypes = require('sequelize')

const sequelize = require('../util/database')

// Anomalie Model
const Anomalie = sequelize.define(
    'anomalie',
    {
        aid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        rid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'resources',
                key: 'rid'
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anomalieStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['F', 'N']]
            }
        }
    }
)

Anomalie.sync({ force:true })

module.exports = Anomalie