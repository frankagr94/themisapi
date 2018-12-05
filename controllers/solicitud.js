//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Solicitud = require('../models/solicitud');

exports.findSolicituds = (req,res) => {
  
  Solicitud.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createSolicitud = (req,res) => {

  let newData = {
    cliente_id:         req.body.cliente_id,
    fecha_creacion:     req.body.fecha_creacion,
    catalogo_serv_id:   req.body.catalogo_serv_id,
    descripcion:        req.body.descripcion
  }
  Solicitud.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'solicitud creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneSolicitud = (req,res) => {

  let conditions = { id: req.params.id };

  Solicitud.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'solicitud no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateSolicitud = (req,res) => {

  let conditions = { id: req.params.id };

  Solicitud.forge(conditions).fetch()
    .then(function(solicitud){
      if(!solicitud) return res.status(404).json({ error : true, data : { message : 'solicitud no existe' } });

      solicitud.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'solicitud actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteSolicitud = (req,res) => {

  let conditions = { id: req.params.id };

  Solicitud.forge(conditions).fetch()
    .then(function(solicitud){
      if(!solicitud) return res.status(404).json({ error : true, data : { message : 'solicitud no existe' } });

      solicitud.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'solicitud eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}