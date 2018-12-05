//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_valoracion = require('../models/tipo_valoracion');

exports.findTipo_valoracions = (req,res) => {
  
  Tipo_valoracion.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createTipo_valoracion = (req,res) => {

  let newData = {
    nombre:          req.body.nombre,
    descripcion:     req.body.descripcion,
    estatus:         'A'
  }

  Tipo_valoracion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'valoracion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneTipo_valoracion = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_valoracion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateTipo_valoracion = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_valoracion.forge(conditions).fetch()
    .then(function(tipo_valoracion){
      if(!tipo_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });
      
      tipo_valoracion.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'valoracion actualizado'} });
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

  Tipo_valoracion.forge(conditions).fetch()
    .then(function(tipo_valoracion){
      if(!tipo_valoracion) return res.status(404).json({ error : true, data : { message : 'tipo de valoracion no existe' } });
      tipo_valoracion.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de valoracio actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteTipo_valoracion = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_valoracion.forge(conditions).fetch()
    .then(function(tipo_valoracion){
      if(!tipo_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      tipo_valoracion.save({estatus:'I'})
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