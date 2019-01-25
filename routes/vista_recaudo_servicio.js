'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_recaudo_servicio')

//----Parametros------
const path = '/vista_recaudo_servicio'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/servicio/${id}`,controller.findOneDocumentByServicio)

module.exports = router;