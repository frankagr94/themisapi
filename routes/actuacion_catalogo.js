//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/actuacion_catalogo')

//----Parametros------
const path = '/actuacion_catalogo'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findActuacion_catalogos)
router.post(`${path}`,controller.createActuacion_catalogo)
router.get(`${path}/${id}`,controller.findOneActuacion_catalogo)
router.put(`${path}/${id}`,controller.updateActuacion_catalogo)
router.delete(`${path}/${id}`,controller.deleteActuacion_catalogo)

module.exports = router;