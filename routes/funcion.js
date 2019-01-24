//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/funcion')

//----Parametros------
const path = '/funcion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findFuncions)
router.post(`${path}`,controller.createFuncion)
router.get(`${path}/${id}`,controller.findOneFuncion)
router.put(`${path}/${id}`,controller.updateFuncion)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteFuncion)
router.delete(`${path}/borrar/${id}`,controller.borrarFuncion)

module.exports = router;