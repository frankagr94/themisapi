//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/conocenos_web')

//----Parametros------
const path = '/conocenos_web'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findPortals)
router.post(`${path}`,controller.createPortal)
router.get(`${path}/${id}`,controller.findOnePortal)
router.put(`${path}/${id}`,controller.updatePortal)
router.delete(`${path}/${id}`,controller.deletePortal)

module.exports = router;