const db = require('../util/database')

module.exports = class Ressource {
    constructor(uid, description, localisation) {
        this.uid = uid
        this.description = description
        this.localisation = localisation
    }

    save() {
        const query = `INSERT INTO resources (uid, res_name, localisation) VALUES (?, ?, ?);`
        return db.execute(query, [this.uid, this.description, this.localisation])
    
    }

    static deleteByRid(rid) {
        return db.execute(`DELETE FROM resources WHERE rid = ${rid};`)
    }

    static fetchAll() {
        return db.execute(`SELECT * FROM resources;`)
    }

    static findByRid(rid) {
        return db.execute(`SELECT * FROM resources WHERE rid = ${rid};`)
    }

    static findByUid(uid) {
        return db.execute(`SELECT * FROM resources WHERE rid = ${uid};`)
    }
}