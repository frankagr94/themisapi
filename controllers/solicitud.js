//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Solicitud = require('../models/solicitud');
const util = require('../middlewares/utils')

exports.findSolicituds = (req,res) => {
  
  Solicitud.fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findSolicitudsByEstatus = (req,res) => {
  Solicitud.where({estatus:req.params.estatus.toUpperCase()||req.params.estatus.toLowerCase()}).fetchAll()
  .then(function(data){
    console.log(req)
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });
}

exports.createSolicitud = (req,res) => {

  let newData = {
    cliente_id:         req.body.cliente_id,
    fecha_creacion:     util.fecha(),
    catalogo_servicio_id:   req.body.catalogo_servicio_id,
    descripcion:        req.body.descripcion,
    estatus:            'P'
  }
  Solicitud.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'Solicitud Enviada' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneSolicitud = (req,res) => {

  let conditions = { id: req.params.id };

  Solicitud.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'La Solicitud No Existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findSolicitudsByCliente = (req,res) => {
  
  Solicitud.where({cliente_id: req.params.cliente_id}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findSolicitudsByClienteAndStatus = (req,res) => {
  
  Solicitud.where({cliente_id: req.params.cliente_id , estatus: req.params.estatus}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.updateSolicitud = (req,res) => {

  let conditions = { id: req.params.id };

  Solicitud.forge(conditions).fetch()
    .then(function(solicitud){
      if(!solicitud) return res.status(404).json({ error : true, data : { message : 'solicitud no existe' } });

      solicitud.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'solicitud actualizada'} });
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
          res.status(200).json({ error : false, data : {message : 'solicitud eliminada'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}