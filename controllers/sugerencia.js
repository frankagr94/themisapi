//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Sugerencia = require('../models/sugerencia');

exports.findSugerencias = (req,res) => {
  
  Sugerencia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findSugerenciasByEstatus = (req,res) => {
  Sugerencia.where({estatus:req.params.estatus.toUpperCase()||req.params.estatus.toLowerCase()}).fetchAll({
    withRelated:[
      'cliente',
      'tipo_sugerencia'
    ]
  })
  .then(function(data){
    console.log(req)
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });
}

exports.createSugerencia = (req,res) => {

  let newData = {
    tipo_sugerencia_id:     req.body.tipo_sugerencia_id,
    cliente_id:             req.body.cliente_id,
    descripcion:            req.body.descripcion,
    fecha_creacion:         req.body.fecha_creacion,
    estatus:                'A',
  }

  Sugerencia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'sugerencia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneSugerencia = (req,res) => {

  let conditions = { id: req.params.id };

  Sugerencia.forge(conditions).fetch({
    withRelated:[
      'cliente',
      'tipo_sugerencia'
    ]
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'sugerencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateSugerencia = (req,res) => {

  let conditions = { id: req.params.id };

  Sugerencia.forge(conditions).fetch()
    .then(function(sugerencia){
      if(!sugerencia) return res.status(404).json({ error : true, data : { message : 'sugerencia no existe' } });

      sugerencia.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'sugerencia actualizado'} });
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

  Sugerencia.forge(conditions).fetch()
    .then(function(sugerencia){
      if(!sugerencia) return res.status(404).json({ error : true, data : { message : 'sugerencia no existe' } });
      sugerencia.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del sugerencia actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteSugerencia = (req,res) => {

  let conditions = { id: req.params.id };

  Sugerencia.forge(conditions).fetch()
    .then(function(sugerencia){
      if(!sugerencia) return res.status(404).json({ error : true, data : { message : 'sugerencia no existe' } });

      sugerencia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'sugerencia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}