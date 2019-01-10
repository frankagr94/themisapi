//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Incidencia = require('../models/incidencia');

exports.findincidencias = (req,res) => {
  
  Incidencia.where({estatus:'A'||'a'||'P'||'p'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createincidencia = (req,res) => {

  let newData = {
    cliente_id:           req.body.cliente_id,
    descripcion:          req.body.descripcion,
    fecha:                releaseEvents.body.fecha,
    estatus:              'P'
  }

  Incidencia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'incidencia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneincidencia = (req,res) => {

  let conditions = { id: req.params.id };

  Incidencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'incidencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findInicidneciaByEstatus = (req,res) => {
    Incidencia.where({estatus:req.params.estatus.toUpperCase()||req.params.estatus.toLowerCase()}).fetchAll()
    .then(function(data){
      console.log(req)
      res.status(200).json({ error : false, data : data.toJSON() });
    })
    .catch(function (err) {
      res.status(500).json({ error: true, data: {message: err.message} });
    });
}

exports.findSolicitudsByCliente = (req,res) => {
  
    Incidencia.where({cliente_id: req.params.cliente_id}).fetchAll()
    .then(function(data){
      res.status(200).json({ error : false, data : data.toJSON() });
    })
    .catch(function (err) {
      res.status(500).json({ error: true, data: {message: err.message} });
    });
  
}

exports.updateincidencia = (req,res) => {

  let conditions = { id: req.params.id };

  Incidencia.forge(conditions).fetch()
    .then(function(incidencia){
      if(!incidencia) return res.status(404).json({ error : true, data : { message : 'incidencia no existe' } });
      
      incidencia.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'incidencia actualizado'} });
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

  Incidencia.forge(conditions).fetch()
    .then(function(incidencia){
      if(!incidencia) return res.status(404).json({ error : true, data : { message : 'incidencia no existe' } });
      incidencia.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus de la incidencia actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteincidencia = (req,res) => {

  let conditions = { id: req.params.id };

  Incidencia.forge(conditions).fetch()
    .then(function(incidencia){
      if(!incidencia) return res.status(404).json({ error : true, data : { message : 'incidencia no existe' } });
      incidencia.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus de la incidencia actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}