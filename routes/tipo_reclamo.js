//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_reclamo')

//----Parametros------
const path = '/tipo_reclamo'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_reclamos)
router.post(`${path}`,controller.createTipo_reclamo)
router.get(`${path}/${id}`,controller.findOneTipo_reclamo)
router.put(`${path}/${id}`,controller.updateTipo_reclamo)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_reclamo)

module.exports = router;