//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/rol')

//----Parametros------
const path = '/rol'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findRols)
router.post(`${path}`,controller.createRol)
router.post(`${path}/asociar`, controller.asociar)
router.get(`${path}/${id}`,controller.findOneRol)
router.put(`${path}/${id}`,controller.updateRol)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteRol)
router.delete(`${path}/borrar/${id}`,controller.borrarRol)

module.exports = router;