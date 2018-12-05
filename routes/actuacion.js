//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/actuacion')

//----Parametros------
const path = '/actuacion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findActuacions)
router.post(`${path}`,controller.createActuacion)
router.get(`${path}/${id}`,controller.findOneActuacion)
router.put(`${path}/${id}`,controller.updateActuacion)
router.put(`${path}/${id}/estatus`,controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteActuacion)

module.exports = router;