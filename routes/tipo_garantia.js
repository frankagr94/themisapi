//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_garantia')

//----Parametros------
const path = '/tipo_garantia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findTipo_garantias)
router.post(`${path}`,controller.createTipo_garantia)
router.get(`${path}/${id}`,controller.findOneTipo_garantia)
router.put(`${path}/${id}`,controller.updateTipo_garantia)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteTipo_garantia)
router.delete(`${path}/borrar/${id}`,controller.borrarTipo_garantia)

module.exports = router;