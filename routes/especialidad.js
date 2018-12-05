//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/especialidad')

//----Parametros------
const path = '/especialidad'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findEspecialidads)
router.post(`${path}`,controller.createEspecialidad)
router.get(`${path}/${id}`,controller.findOneEspecialidad)
router.put(`${path}/${id}`,controller.updateEspecialidad)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteEspecialidad)

module.exports = router;