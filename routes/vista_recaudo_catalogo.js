'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_recaudo_catalogo')

//----Parametros------
const path = '/vista_recaudo_catalogo'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/catalogo/:catalogo_servicio_id`,controller.findOneDocumentByCatalogoId)


module.exports = router;