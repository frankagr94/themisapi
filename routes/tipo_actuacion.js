//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_actuacion')

//----Parametros------
const path = '/tipo_actuacion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_actuacions)
router.post(`${path}`,controller.createTipo_actuacion)
router.get(`${path}/${id}`,controller.findOneTipo_actuacion)
router.put(`${path}/${id}`,controller.updateTipo_actuacion)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_actuacion)

module.exports = router;