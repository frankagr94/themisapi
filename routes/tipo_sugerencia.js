//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_sugerencia')

//----Parametros------
const path = '/tipo_sugerencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_sugerencias)
router.post(`${path}`,controller.createTipo_sugerencia)
router.get(`${path}/${id}`,controller.findOneTipo_sugerencia)
router.put(`${path}/${id}`,controller.updateTipo_sugerencia)
router.delete(`${path}/${id}`,controller.deleteTipo_sugerencia)

module.exports = router;