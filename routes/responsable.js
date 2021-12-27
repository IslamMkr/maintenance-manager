const express = require('express')

const responsableController = require('../controllers/responsable')

const router = express.Router()

router.get('/:responsableId', responsableController.getResponsableHome)

router.get('/:responsableId/add-ressource', responsableController.getAddRessource)

router.post("/:responsableId/add-ressource", responsableController.postAddRessource)

router.post("/:responsableId/ressources/:ressourceId/ressource-delete", responsableController.postRessourceDelete)

router.post('/:responsableId/ressources/:ressourceId', responsableController.postRessourceDetail)

module.exports = router