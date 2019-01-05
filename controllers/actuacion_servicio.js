//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Actuacion_servicio = require('../models/actuacion_servicio');

exports.findActuacion_servicios = (req,res) => {
  
  Actuacion_servicio.forge().fetchAll({
    withRelated:'actuacion'
  })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findActuacion_servicioByServicio = (req,res) => {

  let conditions = { servicio_id: req.params.id_servicio };

  Actuacion_servicio.where(conditions).fetchAll({
    withRelated:'actuacion'
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneActuacion_servicio = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion_servicio.forge(conditions).fetch({
    withRelated:'actuacion'
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateActuacion_servicio = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion_servicio.forge(conditions).fetch()
    .then(function(actuacion_servicio){
      if(!actuacion_servicio) return res.status(404).json({ error : true, data : { message : 'actuacion_servicio no existe' } });
      
      actuacion_servicio.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'actuacion_servicio actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteActuacion_servicio = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion_servicio.forge(conditions).fetch()
    .then(function(actuacion_servicio){
      if(!actuacion_servicio) return res.status(404).json({ error : true, data : { message : 'actuacion_servicio no existe' } });

      actuacion_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'actuacion_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}