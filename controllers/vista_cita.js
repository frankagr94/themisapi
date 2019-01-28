//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_cita = require('../models/vista_cita');

exports.findDocuments = (req,res) => {
  
  Vista_cita.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { actuacion_servicio_id: req.params.id };

  Vista_cita.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_cita no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByCliente = (req,res) => {

  let conditions = { cliente_id: req.params.cliente_id, estatus: req.params.estatus };

  Vista_cita.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_cita no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByAbogado = (req,res) => {

  let conditions = { abogado_id: req.params.abogado_id, estatus: req.params.estatus };

  Vista_cita.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_cita no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByEstatus = (req,res) => {

  let conditions = { estatus: req.params.estatus };

  Vista_cita.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_cita no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}
