//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/solicitud_rechazo')

//----Parametros------
const path = '/solicitud_rechazo'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findSolicitud_rechazos)
router.get(`${path}/${id}`, controller.findOneSolicitud_rechazo)
router.post(`${path}`,controller.createSolicitud_rechazo)
router.put(`${path}/${id}`,controller.updateSolicitud_rechazo)
router.delete(`${path}/${id}`,controller.deletesolicitud_rechazo)

module.exports = router;