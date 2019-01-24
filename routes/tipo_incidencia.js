//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_incidencia')

//----Parametros------
const path = '/tipo_incidencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_incidencias)
router.post(`${path}`,controller.createTipo_incidencia)
router.get(`${path}/${id}`,controller.findOneTipo_incidencia)
router.put(`${path}/${id}`,controller.updateTipo_incidencia)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_incidencia)
router.delete(`${path}/borrar/${id}`,controller.borrarTipo_incidencia)

module.exports = router;