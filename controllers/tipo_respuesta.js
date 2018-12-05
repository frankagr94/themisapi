//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_respuesta = require('../models/tipo_respuesta');

exports.findTipo_respuestas = (req,res) => {
  
  Tipo_respuesta.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createTipo_respuesta = (req,res) => {

  let newData = {
    nombre:        req.body.nombre,
    descripcion:   req.body.descripcion,
    estatus:       'A'
  }

  Tipo_respuesta.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo de respuesta creada' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneTipo_respuesta = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_respuesta.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo de respuesta no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateTipo_respuesta = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_respuesta.forge(conditions).fetch()
    .then(function(tipo_respuesta){
      if(!tipo_respuesta) return res.status(404).json({ error : true, data : { message : 'tipo de respuesta no existe' } });

      tipo_respuesta.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo de respuesta actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.cambiarEstatus = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_respuesta.forge(conditions).fetch()
    .then(function(tipo_respuesta){
      if(!tipo_respuesta) return res.status(404).json({ error : true, data : { message : 'tipo de respuesta no existe' } });
      tipo_respuesta.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de respuesta actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteTipo_respuesta = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_respuesta.forge(conditions).fetch()
    .then(function(tipo_respuesta){
      if(!tipo_respuesta) return res.status(404).json({ error : true, data : { message : 'tipo de respuesta no existe' } });

      tipo_respuesta.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo de respuesta eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}