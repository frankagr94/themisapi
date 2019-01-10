//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/recaudo_servicio')

//----Parametros------
const path = '/recaudo_servicio'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findRecaudo_servicios)
router.post(`${path}/`, controller.createRecaudo_servicio)
router.get(`${path}/${id}`, controller.findOneRecaudo_servicio)
router.put(`${path}/${id}`,controller.updateRecaudo_servicio)

module.exports = router;