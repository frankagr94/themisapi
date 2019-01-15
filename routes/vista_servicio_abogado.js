'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_servicio_abogado')

//----Parametros------
const path = '/vista_servicio_abogado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/abogado/:abogado_id/estatus/:estatus`,controller.findOneDocumentAbogadoId)

module.exports = router;