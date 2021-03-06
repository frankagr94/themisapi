'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_sugerencia')

//----Parametros------
const path = '/reporte_sugerencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)

module.exports = router;