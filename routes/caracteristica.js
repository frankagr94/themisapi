//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/caracteristica')

//----Parametros------
const path = '/caracteristica'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findCaracteristicas)
router.post(`${path}`,controller.createCaracteristica)
router.get(`${path}/${id}`,controller.findOneCaracteristica)
router.put(`${path}/${id}`,controller.updateCaracteristica)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteCaracteristica)

module.exports = router;