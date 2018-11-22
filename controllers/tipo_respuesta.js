//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_respuesta = require('../models/tipo_respuesta');

exports.findDocuments = (req,res) => {
  
  Tipo_respuesta.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:        req.body.nombres,
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

exports.findOneDocument = (req,res) => {

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

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_respuesta.forge(conditions).fetch()
    .then(function(tipo_respuesta){
      if(!tipo_respuesta) return res.status(404).json({ error : true, data : { message : 'tipo de respuesta no existe' } });

      let updateData = {
        nombre:        req.body.nombres,
        descripcion:   req.body.descripcion
      }
      
      tipo_respuesta.save(updateData)
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

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_respuesta.forge(conditions).fetch()
    .then(function(tipo_respuesta){
      if(!tipo_respuesta) return res.status(404).json({ error : true, data : { message : 'tipo de respuesta no existe' } });

      tipo_respuesta.destroy()
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