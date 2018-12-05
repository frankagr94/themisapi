//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/categoria')

//----Parametros------
const path = '/categoria'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findCategorias)
router.post(`${path}`,controller.createCategoria)
router.get(`${path}/${id}`,controller.findOneCategoria)
router.put(`${path}/${id}`,controller.updateCategoria)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteCategoria)

module.exports = router;