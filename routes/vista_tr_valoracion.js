//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_tr_valoracion')

//----Parametros------
const path = '/vista_tr_valoracion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/catalogo/:catalogo_servicio_id`, controller.findOneDocumentByCatalogo)
router.get(`${path}/${id}`,controller.findOneDocument)

module.exports = router;