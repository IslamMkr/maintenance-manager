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

    static fetchAll(cb) {
        getResFromFile(cb)
    }
}