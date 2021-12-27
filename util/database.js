const mysql = require('mysql2')

const poolConfig = {
    host: 'localhost',
    user: 'root',
    database: 'maintenance_manager',
    password: 'mokraisl'
}

const pool = mysql.createPool(poolConfig)

module.exports = pool.promise()