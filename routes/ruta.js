//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/ruta')

//----Parametros------
const path = '/ruta'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findRutas)
router.post(`${path}`,controller.createRuta)
router.get(`${path}/${id}`,controller.findOneRuta)
router.put(`${path}/${id}`,controller.updateRuta)
router.delete(`${path}/${id}`,controller.deleteRuta)
router.delete(`${path}/borrar/${id}`,controller.borrarRuta)

module.exports = router;