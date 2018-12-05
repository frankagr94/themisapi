//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/valoracion')

//----Parametros------
const path = '/valoracion'
const id = ':id'
//----Rutas------ 
router.get(`${path}`, controller.findValoracions)
router.post(`${path}`,controller.createValoracion)
router.get(`${path}/${id}`,controller.findOneValoracion)
router.put(`${path}/${id}`,controller.updateValoracion)
router.delete(`${path}/${id}`,controller.deleteValoracion)

module.exports = router;