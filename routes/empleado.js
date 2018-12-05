//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/empleado')

//----Parametros------
const path = '/empleado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findEmpleados)
router.get(`${path}/visibles`, controller.mostrarVisibles)
router.post(`${path}`,controller.createEmpleado)
router.get(`${path}/${id}`,controller.findOneEmpleado)
router.put(`${path}/${id}`,controller.updateEmpleado)
router.put(`${path}/${id}/show`, controller.hacerVisible)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteEmpleado)

module.exports = router;