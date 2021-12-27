const Anomalie = require("../models/anomalie")
const Resource = require("../models/resource")

exports.getResponsableHome = (req, res) => {
    const responsableId = req.params.responsableId

    Resource.findAll({
        where: {
            uid: responsableId
        }
    }).then(resources => {
        const pageData = {
            pageTitle: 'Home',
            path: '/responsable', 
            ressources: resources, 
            responsableId: responsableId
        }
        
        res.render('responsable/home', pageData)
    }).catch(err => {
        console.log(err)
    })
}

exports.getAddRessource = (req, res) => {
    const responsableId = req.params.responsableId

    const pageData = {
        pageTitle: 'Ajouter une ressource',
        path: '/responsable/add-ressource',
        responsableId: responsableId
    }

    res.render('responsable/add-ressource', pageData)
}

exports.postAddRessource = (req, res) => {
    const responsableId = req.params.responsableId

    const description = req.body.nomRessource
    const localisation = req.body.localisation

    const resourceObject = {
        uid: responsableId,
        resourceName: description,
        localisation: localisation
    }

    Resource.create(resourceObject)
        .then(() => {
            res.redirect(`/${responsableId}`)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postRessourceDelete = (req, res) => {
    const responsableId = req.params.responsableId
    const rid = req.params.ressourceId

    // Deleting ressource anomalies
    Anomalie.destroy({
        where: {
            rid: rid
        }
    }).then(() => {
        // Deleting the ressource
        Resource.destroy({
            where: {
                rid: rid
            }
        }).then(() => {
            res.redirect(`/${responsableId}`)
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.postRessourceDetail = (req, res) => {
    //const responsableId = req.params.responsableId
    const rid = req.params.ressourceId

    Resource.findByPk(rid)
        .then(resource => {
            Anomalie.findAll({
                where: {
                    rid: rid
                }
            }).then(anomalies => {
                const pageData = {
                    pageTitle: resource.resName,
                    path: `/responsable/ressource-detail`,
                    ressource: resource,
                    anomalies: anomalies
                }
    
                res.render('responsable/ressource-detail', pageData)
            }).catch(err => {
                console.log(err)
            }) 
        }).catch(err => {
            console.log(err)
        })
}