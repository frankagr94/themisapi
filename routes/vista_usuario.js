'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_usuario')

//----Parametros------
const path = '/vista_usuario'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)


module.exports = router;