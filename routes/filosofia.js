//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/filosofia')

//----Parametros------
const path = '/filosofia'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findFilosofias)
router.post(`${path}`,controller.createFilosofia)
router.get(`${path}/${id}`,controller.findOneFilosofia)
router.put(`${path}/${id}`,controller.updateFilosofia)
router.delete(`${path}/${id}`,controller.deleteFilosofia)

module.exports = router;