//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/catalogo_servicio')

//----Parametros------
const path = '/catalogo_servicio'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/visibles`, controller.mostrarVisibles)
router.get(`${path}/categoria/${id}`, controller.catalogoPorCategoria)
router.post(`${path}`,controller.createDocument)
router.get(`${path}/${id}`,controller.findOneDocument)
router.put(`${path}/${id}`,controller.updateDocument)
router.put(`${path}/${id}/show`, controller.hacerVisible)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteDocument)

module.exports = router;