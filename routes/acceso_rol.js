//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/acceso_rol')

//----Parametros------
const path = '/acceso_rol'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findAcceso_rols)
router.post(`${path}`,controller.createAcceso_rol)
router.delete(`${path}/delete`, controller.deleteAcceso_rolByParameters)
router.get(`${path}/${id}`,controller.findOneAcceso_rol)
router.put(`${path}/${id}`,controller.updateAcceso_rol)
router.delete(`${path}/${id}`,controller.deleteAcceso_rol)

module.exports = router;