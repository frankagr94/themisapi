//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Actuacion_servicio = require('../models/actuacion_servicio');

exports.findDocuments = (req,res) => {
  
  Actuacion_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    actuacion_id:    req.body.actuacion_id,
    servicio_id:          req.body.servicio_id,
    estatus:              req.body.estatus,
  }

  Actuacion_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'actuacion_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion_servicio.forge(conditions).fetch()
    .then(function(actuacion_servicio){
      if(!actuacion_servicio) return res.status(404).json({ error : true, data : { message : 'actuacion_servicio no existe' } });

      let newData = {
        actuacion_id:    req.body.actuacion_id,
        servicio_id:          req.body.servicio_id,
        estatus:              req.body.estatus,
      }
      
      actuacion_servicio.save(updateData)
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

exports.deleteDocument = (req,res) => {

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