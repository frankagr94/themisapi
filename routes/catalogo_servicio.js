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
router.get(`${path}`, controller.findCatalogos)
router.get(`${path}/visibles`, controller.mostrarVisibles)
router.get(`${path}/categoria/${id}`, controller.catalogoPorCategoria)
router.post(`${path}/actuacion`,controller.asociarActuaciones)
router.post(`${path}/documento`,controller.asociarDocumentos)
router.post(`${path}`,controller.createCatalogo)
router.get(`${path}/${id}`,controller.findOneCatalogo)
router.put(`${path}/${id}`,controller.updateCatalogo)
router.put(`${path}/${id}/show`, controller.hacerVisible)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteCatalogo)

module.exports = router;