const fs = require('fs')
const path = require('path')

const rootDir = require('../util/path')

const pathToAnomaliesFile = path.join(rootDir, 'data/anomalies.json')

const getAnomaliesFromFile = cb => {
    fs.readFile(pathToAnomaliesFile, (err, data) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

module.exports = class Anomalie {
    constructor(rid, description) {
        this.rid = rid
        this.description = description
    }

    save() {
        this.aid = Math.random().toString()

        // TODO: Fix date to DD/MM/YYYY format
        // const options = { 
        //     year: 'numeric', 
        //     month: 'long', 
        //     day: 'numeric' 
        // }
        // this.date = Date.now().toLocaleDateString(undefined, options)

        getAnomaliesFromFile(anomalies => {
            anomalies.push(this)
            fs.writeFile(pathToAnomaliesFile, JSON.stringify(anomalies), err => {
                console.log(err)
            })
        })
    }

    static deleteByRid(rid) {
        getAnomaliesFromFile(anomalies => {
            // Filter : get all anomalies except the ones that have the rid passed in params
            const anoms = anomalies.filter(anom => anom.rid != rid)
            fs.writeFile(pathToAnomaliesFile, JSON.stringify(anoms), err => {
                console.log(err)
            })
        })
    }

    static findByRid(rid, cb) {
        getAnomaliesFromFile(anomalies => {
            const resAnomalies = anomalies.filter(anom => anom.rid == rid)
            
            // Check if array is undefined (or null) of empty
            if (typeof resAnomalies !== 'undefined' && resAnomalies.length > 0) {
                cb(resAnomalies)
            } else {
                cb([])
            }
        })
    }
}