//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_cliente = require('../models/tipo_cliente');

exports.findDocuments = (req,res) => {
  
  Tipo_cliente.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:        req.body.nombre,
    estatus:       req.body.estatus,
    descripcion:   req.body.descripcion
  }

  Tipo_cliente.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_cliente creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_cliente.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_cliente no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_cliente.forge(conditions).fetch()
    .then(function(tipo_cliente){
      if(!tipo_cliente) return res.status(404).json({ error : true, data : { message : 'tipo_cliente no existe' } });

      let updateData = {
        nombre:        req.body.nombre,
        estatus:       req.body.estatus,
        descripcion:   req.body.descripcion
        }
      
      tipo_cliente.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_cliente actualizado'} });
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

  Tipo_cliente.forge(conditions).fetch()
    .then(function(tipo_cliente){
      if(!tipo_cliente) return res.status(404).json({ error : true, data : { message : 'tipo_cliente no existe' } });

      tipo_cliente.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_cliente eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}