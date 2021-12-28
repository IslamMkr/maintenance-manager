const express = require('express')

const authController = require('../controllers/authentification')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/', authController.getAuthPage)

router.get('/disconnect', isAuth, authController.getDisconnect)

router.post('/', authController.postAuthPage)

module.exports = router