//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Respuesta_incidencia = require('../models/respuesta_incidencia');

exports.findDocuments = (req,res) => {
  
  Respuesta_incidencia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    incidencia_id:                  req.body.incidencia_id,
    tipo_respuesta_id:              req.body.tipo_respuesta_id,
    descripcion:                    req.body.descripcion,
    estatus:                        req.body.estatus,
    fecha_creacion:                 req.body.fecha_creacion,
  }

  Respuesta_incidencia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'respuesta_incidencia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_incidencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'respuesta_incidencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_incidencia.forge(conditions).fetch()
    .then(function(respuesta_incidencia){
      if(!respuesta_incidencia) return res.status(404).json({ error : true, data : { message : 'respuesta_incidencia no existe' } });

      respuesta_incidencia.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'respuesta_incidencia actualizado'} });
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

  Respuesta_incidencia.forge(conditions).fetch()
    .then(function(respuesta_incidencia){
      if(!respuesta_incidencia) return res.status(404).json({ error : true, data : { message : 'respuesta_incidencia no existe' } });

      respuesta_incidencia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'respuesta_incidencia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}