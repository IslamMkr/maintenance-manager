const fs = require('fs')
const path = require('path')

const rootDir = require('../util/path')

const pathToUsersFile = path.join(rootDir, 'data/users.json')

const getUsersFromFile = cb => {
    fs.readFile(pathToUsersFile, (err, data) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

module.exports = class Utilisateur {
    constructor(nom, prenom, role, password) {
        this.nom = nom
        this.prenom = prenom
        this.role = role
        this.password = password
    }

    save() {
        this.uid = Math.random().toString()
        
        getUsersFromFile(users => {
            users.push(this)
            fs.writeFile(pathToUsersFile, JSON.stringify(users), err => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        getUsersFromFile(cb)
    }
}