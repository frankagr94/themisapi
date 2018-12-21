'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_empleado')

//----Parametros------
const path = '/vista_empleado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findEmpleados)
router.get(`${path}/${id}`,controller.findOneEmpleado)


module.exports = router;