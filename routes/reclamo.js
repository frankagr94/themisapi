//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reclamo')

//----Parametros------
const path = '/reclamo'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findReclamos)
router.post(`${path}`,controller.createReclamo)
router.get(`${path}/${id}`,controller.findOneReclamo)
router.put(`${path}/${id}`,controller.updateReclamo)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteReclamo)

module.exports = router;