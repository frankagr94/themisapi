//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/gestion_calificacion')

//----Rutas------ 
router.post('/gestion_calificacion', controller.calificar);

module.exports = router;