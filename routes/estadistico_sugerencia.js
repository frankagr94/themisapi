'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/estadistico_sugerencia')

//----Parametros------
const path = '/estadistico_sugerencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)

module.exports = router;