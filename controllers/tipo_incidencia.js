//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_incidencia = require('../models/tipo_incidencia');

exports.findTipo_incidencias = (req,res) => {
  
  Tipo_incidencia.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createTipo_incidencia = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    descripcion:        req.body.descripcion,
    estatus:            'A'
  }

  Tipo_incidencia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_incidencia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneTipo_incidencia = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_incidencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_incidencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateTipo_incidencia = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_incidencia.forge(conditions).fetch()
    .then(function(tipo_incidencia){
      if(!tipo_incidencia) return res.status(404).json({ error : true, data : { message : 'tipo_incidencia no existe' } });

      tipo_incidencia.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_incidencia actualizado'} });
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

  Tipo_incidencia.forge(conditions).fetch()
    .then(function(tipo_incidencia){
      if(!tipo_incidencia) return res.status(404).json({ error : true, data : { message : 'tipo de incidencia no existe' } });
      tipo_incidencia.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de incidencia actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteTipo_incidencia = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_incidencia.forge(conditions).fetch()
    .then(function(tipo_incidencia){
      if(!tipo_incidencia) return res.status(404).json({ error : true, data : { message : 'tipo_incidencia no existe' } });

      tipo_incidencia.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_incidencia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.borrarTipo_incidencia = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_incidencia.forge(conditions).fetch()
    .then(function(tipo_incidencia){
      if(!tipo_incidencia) return res.status(404).json({ error : true, data : { message : 'tipo_incidencia no existe' } });

      tipo_incidencia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_incidencia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}