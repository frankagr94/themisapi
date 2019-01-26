//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Notificacion = require('../models/notificacion');
const notif = require('../middlewares/notification');
const util = require('../middlewares/utils');

exports.findDocuments = (req,res) => {
  
  Notificacion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    tipo_notificacion_id: req.body.tipo_notificacion_id,
    titulo:               req.body.titulo,
    mensaje:          req.body.mensaje,
    fecha_creacion:       util.fechaConHora,
    estatus:              'A',
  }

  Notificacion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'notificacion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Notificacion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'notificacion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Notificacion.forge(conditions).fetchAll()
    .then(function(notificacion){
      if(!notificacion) return res.status(404).json({ error : true, data : { message : 'notificacion no existe' } });
      
      Notificacion.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'notificacion actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findNotificationsByUser = (req,res) => {

  Notificacion.where({usuario_id: req.params.usuario_id}).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'Aun no hay notificaciones para ese usuario' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Notificacion.forge(conditions).fetch()
    .then(function(notificacion){
      if(!notificacion) return res.status(404).json({ error : true, data : { message : 'notificacion no existe' } });

      notificacion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'notificacion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.sendNotification = (req,res) => {

  let newData = {
    tipo_notificacion_id: req.body.tipo_notificacion_id,
    titulo:               req.body.titulo,
    mensaje:          req.body.mensaje,
    fecha_creacion:       util.fechaConHora(),
    usuario_id:           req.body.usuario_id,
    estatus:              'A',
  }

  Notificacion.forge(newData).save()
  .then(function(data){
    notif.sender(req.body.dispositivos, req.body.titulo, req.body.mensaje).then(function(result) {
      if(result.error){
          return res.status(404).send({ message : 'Fallaron algunos, Exitosos: '+result.success+', Fallidos: '+result.failure })
      }else{
          res.status(200).send({ message : 'Notificacion Enviada con exito a '+result.sent+' dispositivos' })
      }
    })
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

  
}
