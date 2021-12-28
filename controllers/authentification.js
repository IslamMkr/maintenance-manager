const User = require("../models/user")

exports.getAuthPage = (req, res) => {
    const pageData = {
        pageTitle: 'Connexion',
        user: null
    }

    res.render('auth', pageData)
}

exports.getDisconnect = (req, res) => {
    req.session.isLoggedIn = false
    req.session.user = null

    res.redirect('/')
}

exports.postAuthPage = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({
        where: {
            userName: username,
            password: password
        }
    }).then(user => {
        if (user) {
            req.session.isLoggedIn = true
            req.session.user = user

            if (user.userRole === 'RM') {
                res.redirect(`/${user.uid}`)
            } else {
                res.redirect('/admin')
            }
        } else {
            //console.log('User not found...')
            res.redirect('/')
        }
    }).catch(err => {
        console.log(err)
    })

    // User.connect(username, password)
    //     .then(([users, fieldData]) => {
    //         if (users.length > 0) {
    //             if (users[0].user_role === 'RM') {
    //                 res.redirect(`/${users[0].uid}`)
    //             } else {
    //                 res.redirect('/admin')
    //             }
    //         } else {
    //             //console.log('User not found...')
    //             res.redirect('/')
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
}
