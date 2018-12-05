//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/red_social')

//----Parametros------
const path = '/red_social'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findRed_socials)
router.post(`${path}`,controller.createRed_social)
router.get(`${path}/${id}`,controller.findOneRed_social)
router.put(`${path}/${id}`,controller.updateRed_social)
router.delete(`${path}/${id}`,controller.deleteRed_social)

module.exports = router;