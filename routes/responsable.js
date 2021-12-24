const express = require('express')

const responsableController = require('../controllers/responsable')

const router = express.Router()

router.get('/responsable', responsableController.getResponsableHome)

router.get('/responsable/add-ressource', responsableController.getAddRessource)

router.post("/responsable/add-ressource", responsableController.postAddRessource)

module.exports = router