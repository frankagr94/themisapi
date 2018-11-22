//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_actuacion = require('../models/tipo_actuacion');

exports.findDocuments = (req,res) => {
  
  Tipo_actuacion.forge().fetchAll()
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

  Tipo_actuacion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo de actuacion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_actuacion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo de actuacion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_actuacion.forge(conditions).fetch()
    .then(function(tipo_actuacion){
      if(!tipo_actuacion) return res.status(404).json({ error : true, data : { message : 'tipo de actuacion no existe' } });

      let updateData = {
        nombre:        req.body.nombres,
        descripcion:   req.body.descripcion
      }
      
      tipo_actuacion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo de actuacion actualizado'} });
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

  Tipo_actuacion.forge(conditions).fetch()
    .then(function(tipo_actuacion){
      if(!tipo_actuacion) return res.status(404).json({ error : true, data : { message : 'tipo de actuacion no existe' } });

      tipo_actuacion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo de actuacion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}