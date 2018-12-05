//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_valoracion')

//----Parametros------
const path = '/tipo_valoracion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_valoracions)
router.post(`${path}`,controller.createTipo_valoracion)
router.get(`${path}/${id}`,controller.findOneTipo_valoracion)
router.put(`${path}/${id}`,controller.updateTipo_valoracion)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_valoracion)

module.exports = router;