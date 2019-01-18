//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Respuesta_sugerencia = require('../models/respuesta_sugerencia');

exports.findDocuments = (req,res) => {
  
  Respuesta_sugerencia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    tipo_respuesta_id:   req.body.tipo_respuesta_id,
    sugerencia_id:                  req.body.sugerencia_id,
    fecha_creacion:                 req.body.fecha_creacion,
  }

  Respuesta_sugerencia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'respuesta_sugerencia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_sugerencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'respuesta_sugerencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_sugerencia.forge(conditions).fetch()
    .then(function(respuesta_sugerencia){
      if(!respuesta_sugerencia) return res.status(404).json({ error : true, data : { message : 'respuesta_sugerencia no existe' } });

      respuesta_sugerencia.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'respuesta_sugerencia actualizado'} });
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

  Respuesta_sugerencia.forge(conditions).fetch()
    .then(function(respuesta_sugerencia){
      if(!respuesta_sugerencia) return res.status(404).json({ error : true, data : { message : 'respuesta_sugerencia no existe' } });

      respuesta_sugerencia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'respuesta_sugerencia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}