//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/cliente')

//----Parametros------
const path = '/cliente'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.post(`${path}`,controller.createDocument)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/usuario/:id_usuario`,controller.findOneClientByUser)
router.put(`${path}/${id}`,controller.updateDocument)
router.put(`${path}/${id}/estatus`, controller.cambiarEstatus)
router.delete(`${path}/${id}`,controller.deleteDocument)

module.exports = router;