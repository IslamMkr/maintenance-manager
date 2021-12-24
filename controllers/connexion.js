exports.getConnexion = (req, res) => {
    const pageData = {
        pageTitle: 'Connexion'
    }

    res.render('connexion', pageData)
}