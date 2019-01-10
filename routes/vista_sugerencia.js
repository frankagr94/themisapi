'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_sugerencia')

//----Parametros------
const path = '/vista_sugerencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/user/:cliente_id`,controller.findOneDocumentByClienteId)

module.exports = router;