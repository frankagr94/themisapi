'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_promocion')

//----Parametros------
const path = '/reporte_promocion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)

module.exports = router;