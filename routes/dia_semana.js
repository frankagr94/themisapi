//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/dia_semana')

//----Parametros------
const path = '/dia_semana'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDia_semanas)
router.post(`${path}`,controller.createDia_semana)
router.get(`${path}/${id}`,controller.findDia_semanas)
router.put(`${path}/${id}`,controller.updateDia_semana)
router.delete(`${path}/${id}`,controller.deleteDia_semana)
router.delete(`${path}/borrar/${id}`,controller.deleteDia_semana)

module.exports = router;