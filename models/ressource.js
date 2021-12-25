const fs = require('fs')
const path = require('path')

const rootDir = require('../util/path')

const pathToResFile = path.join(rootDir, 'data/res.json')

const getResFromFile = cb => {
    fs.readFile(pathToResFile, (err, data) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

module.exports = class Ressource {
    constructor(uid, description, localisation) {
        this.uid = uid
        this.description = description
        this.localisation = localisation
    }

    save() {
        this.rid = Math.random().toString()

        getResFromFile(res => {
            res.push(this)
            fs.writeFile(pathToResFile, JSON.stringify(res), err => {
                console.log(err)
            })
        })
    }

    static deleteByRid(rid) {
        getResFromFile(res => {
            const ressources = res.filter(ressource => ressource.rid != rid)
            fs.writeFile(pathToResFile, JSON.stringify(ressources), err => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        getResFromFile(cb)
    }

    static findById(id, cb) {
        getResFromFile(ressources => {
            const ressource = ressources.find(res => res.rid == id)
            cb(ressource)
        })
    }
}