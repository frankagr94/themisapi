//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/tipo_valoracion_rango_valoracion')

//----Parametros------
const path = '/tr_valoracion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findValoracion_rangos)
router.post(`${path}`,controller.createValoracion_rango)
router.get(`${path}/catalogo/:catalogo_servicio_id`,controller.findOneValoracion_rangoByCatalogo)
router.get(`${path}/rango/:rango_valoracion_id`,controller.findOneValoracion_rangoByRango)
router.get(`${path}/tipo/:tipo_valoracion_id`,controller.findOneValoracion_rangoByTipo)
router.get(`${path}/tipo/:tipo_valoracion_id/rango/:rango_valoracion_id`,controller.findOneValoracion_rangoByTipoRango)
router.get(`${path}/${id}`,controller.findOneValoracion_rango)
router.put(`${path}/${id}`,controller.updateValoracion_rango)
router.delete(`${path}/${id}`,controller.deleteValoracion_rango)

module.exports = router;