'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/estadistico_incidencia2')

//----Parametros------
const path = '/estadistico_incidencia2'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)

module.exports = router;