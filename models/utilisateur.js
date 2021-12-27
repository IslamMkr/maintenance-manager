const db = require('../util/database')

module.exports = class Utilisateur {
    constructor(nom, prenom, role, password) {
        this.nom = nom
        this.prenom = prenom
        this.role = role
        this.password = password
        this.username = this.nom.replace(' ', '').toLowerCase() + '.' + this.prenom.replace(' ', '').toLowerCase()
    }

    save() {
        const query = `INSERT INTO users (f_name, l_name, username, user_role, password) VALUES (?, ?, ?, ?, ?);`
        return db.execute(query, [this.nom, this.prenom, this.username, this.role, this.password])
    }

    static fetchAllResponsable() {
        return db.execute(`SELECT * FROM users WHERE user_role = 'RM';`)
    }

    static connect(username, password) {
        return db.execute(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`)
    }

    static deleteByUid(uid) {
        return db.execute(`DELETE FROM users WHERE uid = ${uid};`)
    }
}