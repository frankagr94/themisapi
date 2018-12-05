//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/garantia')

//----Parametros------
const path = '/garantia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findGarantias)
router.post(`${path}`,controller.createGarantia)
router.get(`${path}/${id}`,controller.findOneGarantia)
router.put(`${path}/${id}`,controller.updateGarantia)
router.delete(`${path}/${id}`,controller.deleteGarantia)

module.exports = router;