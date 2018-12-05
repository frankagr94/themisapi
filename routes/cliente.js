//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/cliente')

//----Parametros------
const path = '/cliente'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findClientes)
router.post(`${path}`,controller.createCliente)
router.get(`${path}/${id}`,controller.findOneCliente)
router.get(`${path}/usuario/:id_usuario`,controller.findOneClientByUser)
router.put(`${path}/${id}`,controller.updateCliente)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteCliente)

module.exports = router;