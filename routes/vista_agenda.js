'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_agenda')

//----Parametros------
const path = '/vista_agenda'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/cliente/:cliente_id`,controller.findOneDocumentByCliente)
router.get(`${path}/abogado/:abogado_id`,controller.findOneDocumentByAbogado)


module.exports = router;