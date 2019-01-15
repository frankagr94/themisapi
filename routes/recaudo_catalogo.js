//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/recaudo_catalogo')

//----Parametros------
const path = '/recaudo_catalogo'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.post(`${path}`,controller.createDocument)
router.get(`${path}/${id}`,controller.findOneDocument)
router.put(`${path}/${id}`,controller.updateDocument)
router.delete(`${path}/${id}`,controller.deleteDocument)

module.exports = router;