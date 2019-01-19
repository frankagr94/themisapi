'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/difusion')

//----Parametros------
const path = '/difusion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/difundir`, controller.difundir)
router.get(`${path}/${id}`,controller.findOneDocument)
router.post(`${path}`,controller.createDocument)
router.put(`${path}/${id}`,controller.updateDocument)
router.delete(`${path}/${id}`,controller.deleteDocument)
module.exports = router;