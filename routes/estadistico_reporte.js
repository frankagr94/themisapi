'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/estadistico_reporte')

//----Parametros------
const path = '/estadistico_reporte'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)

module.exports = router;