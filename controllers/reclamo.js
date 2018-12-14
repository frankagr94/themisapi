//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reclamo = require('../models/reclamo');

exports.findReclamos = (req,res) => {
  
  Reclamo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findReclamosByEstatus = (req,res) => {
  Reclamo.where({estatus:req.params.estatus.toUpperCase()||req.params.estatus.toLowerCase()}).fetchAll({
    withRelated:[
      'cliente',
      'tipo_reclamo'
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

exports.createReclamo = (req,res) => {

  let newData = {
    tipo_reclamo_id:        req.body.tipo_reclamo_id,
    cliente_id:             req.body.cliente_id,
    descripcion:            req.body.descripcion,
    fecha_creacion:         req.body.fecha_creacion,
    estatus:                'P',
  }

  Reclamo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'reclamo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneReclamo = (req,res) => {

  let conditions = { id: req.params.id };

  Reclamo.forge(conditions).fetch({
    withRelated:[
      'cliente',
      'tipo_reclamo'
    ]
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'reclamo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateReclamo = (req,res) => {

  let conditions = { id: req.params.id };

  Reclamo.forge(conditions).fetch()
    .then(function(reclamo){
      if(!reclamo) return res.status(404).json({ error : true, data : { message : 'reclamo no existe' } });

      reclamo.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'reclamo actualizado'} });
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

  Reclamo.forge(conditions).fetch()
    .then(function(reclamo){
      if(!reclamo) return res.status(404).json({ error : true, data : { message : 'reclamo no existe' } });
      reclamo.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del reclamo actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteReclamo = (req,res) => {

  let conditions = { id: req.params.id };

  Reclamo.forge(conditions).fetch()
    .then(function(reclamo){
      if(!reclamo) return res.status(404).json({ error : true, data : { message : 'reclamo no existe' } });

      reclamo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'reclamo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}