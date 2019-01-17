//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_valoracion_rango_valoracion')

//----Parametros------
const path = '/tipo_valoracion_rango_valoracion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findValoracion_rangos)
router.post(`${path}`,controller.createValoracion_rango)
router.get(`${path}/catalogo/:catalogo_servicio_id`,controller.findOneValoracion_rangoByCatalogo)
router.get(`${path}/${id}`,controller.findOneValoracion_rango)
router.put(`${path}/${id}`,controller.updateValoracion_rango)
router.delete(`${path}/${id}`,controller.deleteValoracion_rango)

module.exports = router;