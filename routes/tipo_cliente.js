//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_cliente')

//----Parametros------
const path = '/tipo_cliente'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_clientes)
router.post(`${path}`,controller.createTipo_cliente)
router.get(`${path}/${id}`,controller.findOneTipo_cliente)
router.put(`${path}/${id}`,controller.updateTipo_cliente)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_cliente)
router.delete(`${path}/borrar/${id}`,controller.borrarTipo_cliente)

module.exports = router;