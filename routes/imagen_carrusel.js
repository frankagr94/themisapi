//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/imagen_carrusel')

//----Parametros------
const path = '/imagen_carrusel'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findImagen_carrusels)
router.post(`${path}`,controller.createImagen_carrusel)
router.get(`${path}/${id}`,controller.findOneImagen_carrusel)
router.put(`${path}/${id}`,controller.updateImagen_carrusel)
router.delete(`${path}/${id}`,controller.deleteImagen_carrusel)

module.exports = router;