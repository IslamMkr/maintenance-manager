const express = require('express')

const responsableController = require('../controllers/responsable')

const router = express.Router()

router.get('/responsable', responsableController.getResponsableHome)

router.get('/responsable/add-ressource', responsableController.getAddRessource)

router.post("/responsable/add-ressource", responsableController.postAddRessource)

router.post("/responsable/ressource-delete", responsableController.postRessourceDelete)

router.post('/responsable/ressource-detail', responsableController.postRessourceDetail)

module.exports = router