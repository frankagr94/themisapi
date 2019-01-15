'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_solicitud')

//----Parametros------
const path = '/vista_solicitud'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/estatus/:estatus`,controller.findOneDocumentByEstatus)
router.get(`${path}/cliente/:cliente_id/estatus/:estatus`,controller.findOneDocumentByCliente)

module.exports = router;