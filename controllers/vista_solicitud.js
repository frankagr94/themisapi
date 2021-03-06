//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_solicitud = require('../models/vista_solicitud');

exports.findDocuments = (req,res) => {
  
  Vista_solicitud.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { solicitud_id: req.params.id };

  Vista_solicitud.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_solicitud no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByEstatus = (req,res) => {

  let conditions = { estatus: req.params.estatus };

  Vista_solicitud.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_solicitud no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByClienteEstatus = (req,res) => {

  let conditions = { cliente_id: req.params.cliente_id, estatus: req.params.estatus };

  Vista_solicitud.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_solicitud no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByCliente = (req,res) => {

  let conditions = { cliente_id: req.params.cliente_id};

  Vista_solicitud.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_solicitud no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}