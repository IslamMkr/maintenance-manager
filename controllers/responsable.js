const Anomalie = require("../models/anomalie")
const Ressource = require("../models/Ressource")

exports.getResponsableHome = (req, res) => {
    const responsableId = req.params.responsableId

    Ressource.fetchAll(ressources => {
        const pageData = {
            pageTitle: 'Home',
            path: '/responsable', 
            ressources: ressources, 
            responsableId: responsableId
        }
        
        res.render('responsable/home', pageData)
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

    res.redirect(`/${responsableId}`)
}

exports.postRessourceDelete = (req, res) => {
    const responsableId = req.params.responsableId
    const rid = req.params.ressourceId

    // Deleting ressource anomalies
    Anomalie.deleteByRid(rid)
    
    // Deleting the ressource
    Ressource.deleteByRid(rid)

    res.redirect(`/${responsableId}`)
}

exports.postRessourceDetail = (req, res) => {
    //const responsableId = req.params.responsableId
    const rid = req.params.ressourceId

    Ressource.findById(rid, ressource => {
        Anomalie.findByRid(rid, anomalies => {
            const pageData = {
                pageTitle: ressource.description,
                path: `/responsable/ressource-detail`,
                ressource: ressource,
                anomalies: anomalies
            }

            res.render('responsable/ressource-detail', pageData)
        })
    })
}