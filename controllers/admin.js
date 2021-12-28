//const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.getAdminHome = (req, res) => {
    const user = req.session.user

    User.findAll({
        where: {
            userRole: 'RM'
        }
    }).then(responsables => {
        const pageData = {
            pageTitle: user.firstName + ' ' + user.lastName,
            path: '/admin',
            responsables: responsables,
            user: user
        }
    
        res.render('admin/home', pageData)
    }).catch(err => {
        console.log(err)
    })
}

exports.postAdminHome = (req, res) => {
    const responsableId = req.body.responsableId

    User.destroy({
        where: {
            uid: responsableId
        }
    }).then(() => {
        res.redirect('/admin')
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getAddResponsable = (req, res) => {
    const user = req.session.user

    const pageData = {
        pageTitle: 'Ajouter un responsable',
        path: '/admin/add-responsable',
        user: user
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