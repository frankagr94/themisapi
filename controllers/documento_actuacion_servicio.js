//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Documento_actuacion_servicio = require('../models/documento_actuacion_servicio');

exports.findDocuments = (req,res) => {
  
  Documento_actuacion_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_actuacion_servicio:    req.body.id_actuacion_servicio,
    id_tipo_documento:        req.body.id_tipo_documento,
    descripcion:              req.body.descripcion,
    ruta:                     req.body.ruta,
    fecha_fin:                req.body.fin,
    estatus:                  req.body.estatus,
  }

  Documento_actuacion_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'documento_actuacion_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Documento_actuacion_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'documento_actuacion_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Documento_actuacion_servicio.forge(conditions).fetch()
    .then(function(documento_actuacion_servicio){
      if(!documento_actuacion_servicio) return res.status(404).json({ error : true, data : { message : 'documento_actuacion_servicio no existe' } });

      let updateData = {
        id_tipo_actuacion:    req.body.id_tipo_actuacion,
        id_servicio:          req.body.id_servicio,
        descripcion:          req.body.descripcion,
        duracion_hrs:         req.body.duracion_hrs,
        fecha_creacion:       req.body.fecha_creacion,
        fecha_fin:            req.body.fin,
        estatus:              req.body.estatus,
        id_empleado:          req.body.id_empleado
      }
      
      documento_actuacion_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'documento_actuacion_servicio actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Documento_actuacion_servicio.forge(conditions).fetch()
    .then(function(documento_actuacion_servicio){
      if(!documento_actuacion_servicio) return res.status(404).json({ error : true, data : { message : 'documento_actuacion_servicio no existe' } });

      documento_actuacion_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'documento_actuacion_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}