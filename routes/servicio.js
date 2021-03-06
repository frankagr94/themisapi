//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/servicio')

//----Parametros------
const path = '/servicio'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findServicios)
router.post(`${path}`,controller.createServicio)
router.post(`${path}/actuaciones`,controller.asociarActuaciones)
router.post(`${path}/documentos`,controller.asociarRecaudos)
router.post(`${path}/abogados`,controller.asociarAbogados)
router.get(`${path}/${id}`,controller.findOneServicio)
router.put(`${path}/${id}`,controller.updateServicio)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteServicio)

module.exports = router;