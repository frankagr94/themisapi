//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/gestion_tipo_parametro')

//----Rutas------ 
router.post('/agregar_tipo_parametro', controller.agregar);

module.exports = router;