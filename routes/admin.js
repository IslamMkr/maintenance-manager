const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/admin', adminController.getAdminHome)

router.post('/admin', adminController.postAdminHome)

router.get('/admin/add-responsable', adminController.getAddResponsable)

router.post('/admin/add-responsable', adminController.postAddResponsable)

module.exports = router