'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_cita')

//----Parametros------
const path = '/vista_cita'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/cliente/:cliente_id/estatus/:estatus`,controller.findOneDocumentByCliente)
router.get(`${path}/abogado/:abogado_id/estatus/:estatus`,controller.findOneDocumentByAbogado)
router.get(`${path}/estatus/:estatus`,controller.findOneDocumentByEstatus)

module.exports = router;