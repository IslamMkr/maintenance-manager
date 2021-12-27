const db = require('../util/database')

module.exports = class Anomalie {
    constructor(rid, description) {
        this.rid = rid
        this.description = description
    }

    save() {
        this.status = 'N'
        
        const query = `INSERT INTO anomalies (rid, description, anom_status) VALUES (?, ?, ?);`
        return db.execute(query, [this.rid, this.description, this.status])
    }

    static deleteByRid(rid) {
        return db.execute(`DELETE FROM anomalies WHERE rid = ${rid};`)
    }

    static findByRid(rid) {
        return db.execute(`SELECT * FROM anomalies WHERE rid = ${rid};`)
    }
}