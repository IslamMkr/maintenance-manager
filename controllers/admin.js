const Utilisateur = require("../models/Utilisateur")

exports.getAdminHome = (req, res) => {
    Utilisateur.fetchAllResponsable(responsables => {
        const pageData = {
            pageTitle: 'Home',
            path: '/admin',
            responsables: responsables
        }
    
        res.render('admin/home', pageData)
    })
}

exports.getAddResponsable = (req, res) => {
    const pageData = {
        pageTitle: 'Ajouter un responsable',
        path: '/admin/add-responsable'
    }

    res.render('admin/add-responsable', pageData)
}

exports.postAddResponsable = (req, res) => {
    const nom = req.body.nom
    const prenom = req.body.prenom
    const role = 'RM'
    const password = req.body.password
    const utilisateur = new Utilisateur(nom, prenom, role, password)
    utilisateur.save()
    res.redirect('/admin')
}

// exports.postAddResponsable = (req, res) => {
//     const nom = req.body.nom
//     const prenom = req.body.prenom
//     const role = 'RM'
//     const password = req.body.password
//     const utilisateur = new Utilisateur(nom, prenom, role, password)
//     utilisateur.save()
//     res.redirect('/admin')
// }