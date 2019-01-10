//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/incidencia')

//----Parametros------
const path = '/incidencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findincidencias)
router.post(`${path}`,controller.createincidencia)
router.get(`${path}/${id}`,controller.findOneincidencia)
router.put(`${path}/${id}`,controller.updateincidencia)
router.put(`${path}/${id}/estatus`,controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteincidencia)

module.exports = router;