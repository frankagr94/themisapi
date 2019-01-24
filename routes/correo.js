//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/correos')

//----Parametros------
const path = '/correo'
//----Rutas------ 
router.post(`${path}/apertura`, controller.apertura)
router.post(`${path}/cierre`,controller.cierre)
router.post(`${path}/reclamoAceptado`,controller.reclamoAceptado)
router.post(`${path}/reclamoRechazado`,controller.reclamoRechazado)
router.post(`${path}/solicitudAceptada`,controller.solicitudAceptada)
router.post(`${path}/cita`,controller.solicitudCita)
router.post(`${path}/solicitudRechazo`,controller.solicitudRechazada)
module.exports = router;