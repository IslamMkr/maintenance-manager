const express = require('express')

const connexionController = require('../controllers/connexion')

const router = express.Router()

router.get('/', connexionController.getConnexion)

module.exports = router