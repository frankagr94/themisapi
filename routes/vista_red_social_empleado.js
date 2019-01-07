'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_red_social_empleado')

//----Parametros------
const path = '/vista_red_social_empleado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)


module.exports = router;