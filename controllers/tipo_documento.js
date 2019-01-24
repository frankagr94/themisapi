//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_documento = require('../models/tipo_documento');

exports.findTipo_documentos = (req,res) => {
  
  Tipo_documento.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createTipo_documento = (req,res) => {

  let newData = {
    nombre:        req.body.nombre,
    descripcion:   req.body.descripcion,
    estatus:       'A'
  }

  Tipo_documento.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo de documento creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneTipo_documento = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_documento.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo de documento no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateTipo_documento = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_documento.forge(conditions).fetch()
    .then(function(tipo_documento){
      if(!tipo_documento) return res.status(404).json({ error : true, data : { message : 'tipo de documento no existe' } });

      tipo_documento.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo de documento actualizado'} });
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

  Tipo_documento.forge(conditions).fetch()
    .then(function(tipo_documento){
      if(!tipo_documento) return res.status(404).json({ error : true, data : { message : 'tipo de documento no existe' } });
      tipo_documento.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de documento actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteTipo_documento = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_documento.forge(conditions).fetch()
    .then(function(tipo_documento){
      if(!tipo_documento) return res.status(404).json({ error : true, data : { message : 'tipo de documento no existe' } });

      tipo_documento.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo de documento eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.borrarTipo_documento = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_documento.forge(conditions).fetch()
    .then(function(tipo_documento){
      if(!tipo_documento) return res.status(404).json({ error : true, data : { message : 'tipo de documento no existe' } });

      tipo_documento.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo de documento eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}