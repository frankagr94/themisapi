//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/estado_civil')

//----Parametros------
const path = '/estado_civil'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findEstado_civils)
router.post(`${path}`,controller.createEstado_civil)
router.get(`${path}/${id}`,controller.findOneEstado_civil)
router.put(`${path}/${id}`,controller.updateEstado_civil)
router.delete(`${path}/${id}`,controller.deleteEstado_civil)

module.exports = router;