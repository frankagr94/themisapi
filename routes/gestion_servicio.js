//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/gestion_servicio')

//----Rutas------ 
router.post('/agregar_servicio', controller.agregar);

module.exports = router;