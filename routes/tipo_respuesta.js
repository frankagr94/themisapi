//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_respuesta')

//----Parametros------
const path = '/tipo_respuesta'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_respuestas)
router.post(`${path}`,controller.createTipo_respuesta)
router.get(`${path}/${id}`,controller.findOneTipo_respuesta)
router.put(`${path}/${id}`,controller.updateTipo_respuesta)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_respuesta)

module.exports = router;