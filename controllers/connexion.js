const Utilisateur = require("../models/Utilisateur")

exports.getConnexion = (req, res) => {
    const pageData = {
        pageTitle: 'Connexion'
    }

    res.render('connexion', pageData)
}

exports.postConnexion = (req, res) => {
    const nom = req.body.nom
    const password = req.body.password

    Utilisateur.connect(nom, password, user => {
        if (user) {
            if (user.role === 'RM') {
                res.redirect(`/responsable?uid=${user.uid}`)
            } else {
                res.redirect('/admin')
            }
        } else {
            console.log('User not found...')
            res.redirect('/')
        }
    })
}