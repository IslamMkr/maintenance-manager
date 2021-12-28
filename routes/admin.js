const express = require('express')

const adminController = require('../controllers/admin')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/admin', isAuth, adminController.getAdminHome)

router.post('/admin', isAuth, adminController.postAdminHome)

router.get('/admin/add-responsable', isAuth, adminController.getAddResponsable)

router.post('/admin/add-responsable', isAuth, adminController.postAddResponsable)

module.exports = router