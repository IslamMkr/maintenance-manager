const express = require('express')

const anonymousController = require('../controllers/anonymous')

const router = express.Router()

router.get('/ressources/:resourceId', anonymousController.getRapportPage)

router.post('/ressources/:resourceId/add-anomalie', anonymousController.postAddRapport)

module.exports = router