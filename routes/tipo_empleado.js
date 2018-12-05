//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_empleado')

//----Parametros------
const path = '/tipo_empleado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_empleados)
router.post(`${path}`,controller.createTipo_empleado)
router.get(`${path}/${id}`,controller.findOneTipo_empleado)
router.put(`${path}/${id}`,controller.updateTipo_empleado)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_empleado)

module.exports = router;