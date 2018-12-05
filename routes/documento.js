//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/documento')

//----Parametros------
const path = '/documento'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocumentos)
router.post(`${path}`,controller.createDocumento)
router.get(`${path}/${id}`,controller.findOneDocumento)
router.put(`${path}/${id}`,controller.updateDocumento)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteDocumento)

module.exports = router;