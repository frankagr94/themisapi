//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/estado')

//----Parametros------
const path = '/estado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findEstados)
router.post(`${path}`,controller.createEstado)
router.get(`${path}/${id}`,controller.findOneEstado)
router.put(`${path}/${id}`,controller.updateEstado)
router.delete(`${path}/${id}`,controller.deleteEstado)

module.exports = router;