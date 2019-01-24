'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_caracteristica')

//----Parametros------
const path = '/vista_caracteristicas'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findcaracteristicas)


module.exports = router;