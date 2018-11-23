//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_sugerencia = require('../models/tipo_sugerencia');

exports.findDocuments = (req,res) => {
  
  Tipo_sugerencia.forge().fetchAll()
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

  Tipo_sugerencia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo de sugerencia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_sugerencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo de sugerencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_sugerencia.forge(conditions).fetch()
    .then(function(tipo_sugerencia){
      if(!tipo_sugerencia) return res.status(404).json({ error : true, data : { message : 'tipo de sugerencia no existe' } });

      let updateData = {
        nombre:        req.body.nombres,
        descripcion:   req.body.descripcion
      }
      
      tipo_sugerencia.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo de sugerencia actualizado'} });
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

  Actuacion.forge(conditions).fetch()
    .then(function(actuacion){
      if(!actuacion) return res.status(404).json({ error : true, data : { message : 'tipo de sugerencia no existe' } });
      actuacion.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de sugerencia actualizado'} });
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

  Tipo_sugerencia.forge(conditions).fetch()
    .then(function(tipo_sugerencia){
      if(!tipo_sugerencia) return res.status(404).json({ error : true, data : { message : 'tipo de sugerencia no existe' } });

      tipo_sugerencia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo de sugerencia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}