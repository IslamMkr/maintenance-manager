const express = require('express')

const responsableController = require('../controllers/responsable')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/:responsableId', isAuth, responsableController.getResponsableHome)

router.get('/:responsableId/add-ressource', isAuth, responsableController.getAddRessource)

router.post("/:responsableId/add-ressource", isAuth, responsableController.postAddRessource)

router.post("/:responsableId/ressources/:ressourceId/ressource-delete", isAuth, responsableController.postRessourceDelete)

router.post('/:responsableId/ressources/:ressourceId', isAuth, responsableController.postRessourceDetail)

module.exports = router