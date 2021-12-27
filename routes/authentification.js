const express = require('express')

const authController = require('../controllers/authentification')

const router = express.Router()

router.get('/', authController.getAuthPage)

router.post('/', authController.postAuthPage)

module.exports = router