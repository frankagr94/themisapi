//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/empresa')

//----Parametros------
const path = '/empresa'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findEmpresas)
router.post(`${path}`,controller.createEmpresa)
router.get(`${path}/${id}`,controller.findOneEmpresa)
router.put(`${path}/${id}`,controller.updateEmpresa)
router.delete(`${path}/${id}`,controller.deleteEmpresa)

module.exports = router;