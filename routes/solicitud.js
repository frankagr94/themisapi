//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/solicitud')

//----Parametros------
const path = '/solicitud'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findSolicituds)
router.post(`${path}`,controller.createSolicitud)
router.get(`${path}/${id}`,controller.findOneSolicitud)
router.put(`${path}/${id}`,controller.updateSolicitud)
router.delete(`${path}/${id}`,controller.deleteSolicitud)

module.exports = router;