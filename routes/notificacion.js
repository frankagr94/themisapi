//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/notificacion')

//----Parametros------
const path = '/notificacion'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.post(`${path}`,controller.createDocument)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get(`${path}/findAllByUser/${':usuario_id'}`,controller.findNotificationsByUser)
router.put(`${path}/${id}`,controller.updateDocument)
router.delete(`${path}/${id}`,controller.deleteDocument)
router.post(`${path}/enviar`,controller.sendNotification)

module.exports = router;