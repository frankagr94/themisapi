//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Incidencia = require('../models/incidencia');

exports.findincidencias = (req,res) => {
  
  Incidencia.where({estatus:'P'||'A'}).fetchAll()
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
    tipo_incidencia_id:   req.body.tipo_incidencia_id,
    tipo_respuesta_id:    req.body.tipo_respuesta_id,
    actuacion_servicio_id:req.body.actuacion_servicio_id,
    descripcion:          req.body.descripcion,
    fecha_creado:         req.body.fecha_creado,
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

exports.findIncidenciasByCliente = (req,res) => {
  
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