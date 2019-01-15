'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_servicio')

//----Parametros------
const path = '/vista_servicio'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/cliente/:cliente_id/estatus/:estatus`,controller.findOneDocumentByClient)

module.exports = router;