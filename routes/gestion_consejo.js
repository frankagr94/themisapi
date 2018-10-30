//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/gestion_consejo')

//----Rutas------ 
router.post('/agregar_consejo', controller.agregar);

module.exports = router;