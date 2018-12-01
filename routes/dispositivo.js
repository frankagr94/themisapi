//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/dispositivo')

//----Parametros------
const path = '/dispositivo'
const usuario_id = ':usuario_id'

//----Rutas------ 
router.get(`${path}`, controller.findDispositivos)
router.post(`${path}`,controller.saveDispositivo)
router.get(`${path}/${usuario_id}`,controller.findOneDispositivo)
router.put(`${path}/${usuario_id}`,controller.updateDispositivo)
router.delete(`${path}/${usuario_id}`,controller.deleteDispositivo)

module.exports = router;