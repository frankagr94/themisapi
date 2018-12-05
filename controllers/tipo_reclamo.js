//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_reclamo = require('../models/tipo_reclamo');

exports.findTipo_reclamos = (req,res) => {
  
  Tipo_reclamo.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createTipo_reclamo = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    descripcion:        req.body.descripcion,
    estatus:            'A'
  }

  Tipo_reclamo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_reclamo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneTipo_reclamo = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_reclamo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_reclamo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateTipo_reclamo = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_reclamo.forge(conditions).fetch()
    .then(function(tipo_reclamo){
      if(!tipo_reclamo) return res.status(404).json({ error : true, data : { message : 'tipo_reclamo no existe' } });

      tipo_reclamo.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_reclamo actualizado'} });
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

  Tipo_reclamo.forge(conditions).fetch()
    .then(function(tipo_reclamo){
      if(!tipo_reclamo) return res.status(404).json({ error : true, data : { message : 'tipo de reclamo no existe' } });
      tipo_reclamo.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de reclamo actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteTipo_reclamo = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_reclamo.forge(conditions).fetch()
    .then(function(tipo_reclamo){
      if(!tipo_reclamo) return res.status(404).json({ error : true, data : { message : 'tipo_reclamo no existe' } });

      tipo_reclamo.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_reclamo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}