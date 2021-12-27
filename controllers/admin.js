const User = require('../models/user')

exports.getAdminHome = (req, res) => {
    User.findAll({
        where: {
            userRole: 'RM'
        }
    }).then(responsables => {
        const pageData = {
            pageTitle: 'Home',
            path: '/admin',
            responsables: responsables
        }
    
        res.render('admin/home', pageData)
    }).catch(err => {
        console.log(err)
    })
}

exports.postAdminHome = (req, res) => {
    const responsableId = req.body.responsableId

    User.deleteByUid(responsableId)
        .then(() => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
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
    const username = nom.toLowerCase().replace(' ', '') + '.' + prenom.toLowerCase().replace(' ', '')
    const role = 'RM'
    const password = req.body.password

    const userObject = {
        firstName: nom,
        lastName: prenom,
        userName: username,
        userRole: role,
        password: password
    }

    User.create(userObject)
        .then(() => {
            res.redirect('/admin')
        }).catch(err => {
            console.log(err)
        })  
}