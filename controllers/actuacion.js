//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Actuacion = require('../models/actuacion');

exports.findDocuments = (req,res) => {
  
  Actuacion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    estatus:            req.body.estatus,
  }

  Actuacion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'actuacion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion.forge(conditions).fetch()
    .then(function(actuacion){
      if(!actuacion) return res.status(404).json({ error : true, data : { message : 'actuacion no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        estatus:            req.body.estatus,
      }
      
      actuacion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'actuacion actualizado'} });
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

  Actuacion.forge(conditions).fetch()
    .then(function(actuacion){
      if(!actuacion) return res.status(404).json({ error : true, data : { message : 'actuacion no existe' } });

      actuacion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'actuacion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}