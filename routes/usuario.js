//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/usuario')

//----Parametros------
const path = '/usuario'
const id = ':id'
const correo = ':correo'
//----Rutas------ 
router.get(`${path}`, controller.findUsuarios)
router.post(`${path}`,controller.createUsuario)
router.get(`${path}/${correo}`,controller.findOneUsuario)
router.put(`${path}/${id}`,controller.updateUsuario)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteUsuario)

module.exports = router;