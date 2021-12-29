const Resource = require("../models/resource")
const Anomalie = require("../models/anomalie")

exports.getRapportPage = (req, res) => {
    const rid = req.params.resourceId
    
    Resource.findByPk(rid)
        .then(resource => {
            req.session.resource = resource

            Anomalie.findAll({
                where: {
                    rid: rid
                }
            }).then(anomalies => {
                const pageData = {
                    pageTitle: resource.resourceName,
                    ressource: resource,
                    anomalies: anomalies,
                    user: null
                }
    
                res.render('anonymous-users/rapport', pageData)
            }).catch(err => {
                console.log(err)
            }) 
        }).catch(err => {
            console.log(err)
        })
}

exports.postAddRapport = (req, res) => {
    const description = req.body.description
    const rid = req.params.resourceId

    const anomalieObject = {
        rid: rid,
        description: description,
        anomalieStatus: 'N'
    }

    Anomalie.create(anomalieObject)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}