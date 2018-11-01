'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/usuario_cliente')

//----Parametros------
const path = '/usuario/cliente'
const id = ':id'

//----Rutas------ 

router.get(`${path}/${id}`,controller.findOneDocument)

module.exports = router;