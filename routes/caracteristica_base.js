//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/caracteristica_base')

//----Parametros------
const path = '/caracteristica_base'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findCaracteristica_bases)
router.post(`${path}`,controller.createCaracteristica_base)
router.get(`${path}/${id}`,controller.findOneCaracteristica_base)
router.put(`${path}/${id}`,controller.updateCaracteristica_base)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteCaracteristica_base)
router.delete(`${path}/borrar/${id}`,controller.borrarCaracteristica_base)

module.exports = router;