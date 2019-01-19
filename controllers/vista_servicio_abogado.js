//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_servicio_abogado = require('../models/vista_servicio_abogado');

exports.findDocuments = (req,res) => {
  
  Vista_servicio_abogado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { servicio_id: req.params.id };

  Vista_servicio_abogado.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_servicio_abogado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentAbogadoEstatus = (req,res) => {

  let conditions = { abogado_id: req.params.abogado_id, estatus: req.params.estatus };

  Vista_servicio_abogado.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_servicio_abogado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentAbogadoId = (req,res) => {

  let conditions = { abogado_id: req.params.id};

  Vista_servicio_abogado.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_servicio_abogado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}