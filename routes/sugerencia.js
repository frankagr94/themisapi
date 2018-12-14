//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/sugerencia')

//----Parametros------
const path = '/sugerencia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findSugerencias)
router.post(`${path}`,controller.createSugerencia)
router.get(`${path}/${id}`,controller.findOneSugerencia)
router.put(`${path}/${id}`,controller.updateSugerencia)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteSugerencia)

module.exports = router;