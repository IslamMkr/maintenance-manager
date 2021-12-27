const Anomalie = require("../models/anomalie")
const Ressource = require("../models/Ressource")

exports.getResponsableHome = (req, res) => {
    const responsableId = req.params.responsableId

    Ressource.fetchAll()
        .then(([ressources, fieldData]) => {
            const pageData = {
                pageTitle: 'Home',
                path: '/responsable', 
                ressources: ressources, 
                responsableId: responsableId
            }
            
            res.render('responsable/home', pageData)
        })
        .catch(err => {
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

    const desc = req.body.nomRessource
    const localisation = req.body.localisation
    const ressource = new Ressource(responsableId, desc, localisation)

    ressource.save()
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
    Anomalie.deleteByRid(rid)
        .then(() => {
            // Deleting the ressource
            Ressource.deleteByRid(rid)
                .then(() => {
                    res.redirect(`/${responsableId}`)
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postRessourceDetail = (req, res) => {
    //const responsableId = req.params.responsableId
    const rid = req.params.ressourceId
    
    Ressource.findByRid(rid)
        .then(([ressources, fieldData]) => {
            Anomalie.findByRid(rid)
                .then(([anomalies, fieldData]) => {
                    const pageData = {
                        pageTitle: ressources[0].res_name,
                        path: `/responsable/ressource-detail`,
                        ressource: ressources[0],
                        anomalies: anomalies
                    }
        
                    res.render('responsable/ressource-detail', pageData)
                })
        })
}