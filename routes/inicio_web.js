//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/inicio_web')

//----Parametros------
const path = '/inicio_web'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findInicios)
router.post(`${path}`,controller.createInicio)
router.get(`${path}/${id}`,controller.findOneInicio)
router.put(`${path}/${id}`,controller.updateInicio)
router.delete(`${path}/${id}`,controller.deleteInicio)

module.exports = router;