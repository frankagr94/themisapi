//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/gestion_promocion')

//----Rutas------ 
router.post('/agregar_promocion', controller.agregar);

module.exports = router;