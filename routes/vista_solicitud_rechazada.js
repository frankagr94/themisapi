//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_solicitud_rechazada')

//----Parametros------
const path = '/vista_solicitud_rechazada'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`, controller.findOneDocument)

module.exports = router;