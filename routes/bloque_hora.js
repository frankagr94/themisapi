//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/bloque_hora')

//----Parametros------
const path = '/bloque_hora'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findBloque_horas)
router.post(`${path}`,controller.createBloque_hora)
router.get(`${path}/${id}`,controller.findOneBloque_hora)
router.put(`${path}/${id}`,controller.updateBloque_hora)
router.delete(`${path}/${id}`,controller.deleteBloque_hora)

module.exports = router;