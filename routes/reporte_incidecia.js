'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_incidencia')

//----Parametros------
const path = '/reporte_incidencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)


module.exports = router;