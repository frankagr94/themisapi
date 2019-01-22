'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_valoracion')

//----Parametros------
const path = '/vista_valoracion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/tipo_servicio/:tipo_servicio_id`, controller.findDocumentsByTipoServicio)

module.exports = router;