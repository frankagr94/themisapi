//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_actuacion = require('../models/tipo_actuacion');

exports.findTipo_actuacions = (req,res) => {
  
  Tipo_actuacion.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createTipo_actuacion = (req,res) => {

  let newData = {
    nombre:        req.body.nombre,
    descripcion:   req.body.descripcion,
    color_primario: req.body.color_primario,
    color_secundario: req.body.color_secundario,
    estatus:       'A'
  }

  Tipo_actuacion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo de tipo_actuacion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneTipo_actuacion = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_actuacion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo de tipo_actuacion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateTipo_actuacion = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_actuacion.forge(conditions).fetch()
    .then(function(tipo_actuacion){
      if(!tipo_actuacion) return res.status(404).json({ error : true, data : { message : 'tipo de tipo_actuacion no existe' } });

      tipo_actuacion.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo de tipo_actuacion actualizado'} });
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

  Tipo_actuacion.forge(conditions).fetch()
    .then(function(tipo_actuacion){
      if(!tipo_actuacion) return res.status(404).json({ error : true, data : { message : 'tipo tipo_actuacion no existe' } });
      tipo_actuacion.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo tipo_actuacion actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteTipo_actuacion = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_tipo_actuacion.forge(conditions).fetch()
    .then(function(tipo_tipo_actuacion){
      if(!tipo_tipo_actuacion) return res.status(404).json({ error : true, data : { message : 'tipo de tipo_actuacion no existe' } });

      tipo_actuacion.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo de tipo_actuacion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}