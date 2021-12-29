/**
 * Securing our routes
 * It allows only to the logged in users to have access to the pages
 * If the user is logged in we call the next middleware
 * Else we redirect it to the login page
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/')
    }

    next()
}