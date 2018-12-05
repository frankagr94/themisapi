//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/rango_valoracion')

//----Parametros------
const path = '/rango_valoracion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findRango_valoracions)
router.post(`${path}`,controller.createRango_valoracion)
router.get(`${path}/${id}`,controller.findOneRango_valoracion)
router.put(`${path}/${id}`,controller.updateRango_valoracion)
router.delete(`${path}/${id}`,controller.deleteRango_valoracion)

module.exports = router;