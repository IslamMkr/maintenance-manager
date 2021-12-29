const express = require('express')

const responsableController = require('../controllers/responsable')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

// Route : GET => maintenance manager home page
router.get('/:responsableId', isAuth, responsableController.getResponsableHome)

// Route : GET => Page for adding resources 
router.get('/:responsableId/add-ressource', isAuth, responsableController.getAddRessource)

// Route : GET => Resource generated QRCode page
router.get('/:responsableId/ressources/:ressourceId/qrcode', isAuth, responsableController.getGenerateQRCode)

router.get('/:responsableId/ressources/:ressourceId/anomalies/:anomalieId', isAuth, responsableController.getFixAnomalie)

// Route : POST => Page for adding resources
router.post("/:responsableId/add-ressource", isAuth, responsableController.postAddRessource)

// Route : POST => Deleting a resource page
router.post("/:responsableId/ressources/:ressourceId/ressource-delete", isAuth, responsableController.postRessourceDelete)

// Route : POST => Resource page
router.post('/:responsableId/ressources/:ressourceId', isAuth, responsableController.postRessourceDetail)

module.exports = router