const Anomalie = require("../models/anomalie")
const Ressource = require("../models/Ressource")

exports.getResponsableHome = (req, res) => {
    Ressource.fetchAll(ressources => {
        const pageData = {
            pageTitle: 'Home',
            path: '/responsable', 
            ressources: ressources
        }
        
        res.render('responsable/home', pageData)
    })
}

// exports.getRessourceDetail = (req, res) => {
//     const pageData = {
//         pageTitle: 'Details Ressource'
//     }

//     res.render('responsable/ressource-detail', pageData)
// }

exports.getAddRessource = (req, res) => {
    const pageData = {
        pageTitle: 'Ajouter une ressource',
        path: '/responsable/add-ressource'
    }

    res.render('responsable/add-ressource', pageData)
}

exports.postAddRessource = (req, res) => {
    const desc = req.body.nomRessource
    const localisation = req.body.localisation
    const ressource = new Ressource(1, desc, localisation)
    ressource.save()

    res.redirect('/responsable')
}

exports.postRessourceDetail = (req, res) => {
    const rid = req.body.ressourceId

    Ressource.findById(rid, ressource => {
        Anomalie.findByRid(rid, anomalies => {
            const pageData = {
                pageTitle: ressource.description,
                path: '/responsable/ressource-detail',
                ressource: ressource,
                anomalies: anomalies
            }
    
            res.render('responsable/ressource-detail', pageData)
        })
    })
}