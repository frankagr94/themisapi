//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/pais')

//----Parametros------
const path = '/pais'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findPaises)
router.post(`${path}`,controller.createPais)
router.get(`${path}/${id}`,controller.findOnePais)
router.put(`${path}/${id}`,controller.updatePais)
router.delete(`${path}/${id}`,controller.deletePais)

module.exports = router;