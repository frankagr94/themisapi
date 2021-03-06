'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_cliente_abogado')

//----Parametros------
const path = '/vista_cliente_abogado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/abogado/${id}`,controller.findOneDocumentByAbogado)

module.exports = router;