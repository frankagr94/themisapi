//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Bloque_hora = require('../models/bloque_hora');

exports.findDocuments = (req,res) => {
  
  Bloque_hora.forge().fetchAll()
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
    descripcion:   req.body.descripcion
  }

  Bloque_hora.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'bloque de hora creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Bloque_hora.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'bloque de hora no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Bloque_hora.forge(conditions).fetch()
    .then(function(bloque_hora){
      if(!bloque_hora) return res.status(404).json({ error : true, data : { message : 'bloque de hora no existe' } });

      let updateData = {
        nombre:        req.body.nombres,
        descripcion:   req.body.descripcion
      }
      
      bloque_hora.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'bloque de hora actualizado'} });
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

  Bloque_hora.forge(conditions).fetch()
    .then(function(bloque_hora){
      if(!bloque_hora) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      bloque_hora.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'valoracion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}