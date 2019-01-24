//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_documento')

//----Parametros------
const path = '/tipo_documento'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_documentos)
router.post(`${path}`,controller.createTipo_documento)
router.get(`${path}/${id}`,controller.findOneTipo_documento)
router.put(`${path}/${id}`,controller.updateTipo_documento)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_documento)
router.delete(`${path}/borrar/${id}`,controller.borrarTipo_documento)

module.exports = router;