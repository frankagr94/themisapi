//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Cita = require('../models/cita');

exports.findDocuments = (req,res) => {
  
  Cita.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_orden_servicio:  req.body.id_orden_servicio,
    id_bloque:          req.body.id_bloque,
    fecha_cita:         req.body.fecha_cita,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
    estado:             req.body.estado,
  }

  Cita.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'cita creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Cita.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'cita no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Cita.forge(conditions).fetch()
    .then(function(cita){
      if(!cita) return res.status(404).json({ error : true, data : { message : 'cita no existe' } });

      let updateData = {
        id_orden_servicio:  req.body.id_orden_servicio,
        id_bloque:          req.body.id_bloque,
        fecha_cita:         req.body.fecha_cita,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
        estado:             req.body.estado,
      }
      
      cita.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'cita actualizado'} });
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

  Cita.forge(conditions).fetch()
    .then(function(cita){
      if(!cita) return res.status(404).json({ error : true, data : { message : 'cita no existe' } });

      cita.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'cita eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}