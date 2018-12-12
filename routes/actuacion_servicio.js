//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/actuacion_servicio')

//----Parametros------
const path = '/actuacion_servicio'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findActuacion_servicios)
router.get(`${path}/servicio/:id_servicio`,controller.findActuacion_servicioByServicio)
router.get(`${path}/${id}`,controller.findOneActuacion_servicio)
router.put(`${path}/${id}`,controller.updateActuacion_servicio)
router.delete(`${path}/${id}`,controller.deleteActuacion_servicio)

module.exports = router;