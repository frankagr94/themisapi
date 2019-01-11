'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_incidencia')

//----Parametros------
const path = '/vista_incidencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/cliente/:cliente_id`,controller.findiIncidenciaByCliente)
router.get(`${path}/${id}`,controller.findOneDocument)


module.exports = router;