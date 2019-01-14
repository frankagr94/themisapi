//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_agenda = require('../models/vista_agenda');

exports.findDocuments = (req,res) => {
  
  Vista_agenda.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { actuacion_servicio_id: req.params.id };

  Vista_agenda.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByCliente = (req,res) => {

    let conditions = { cliente_id: req.params.cliente_id };
  
    Vista_agenda.where(conditions).fetchAll()
      .then(function(data){
        if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion no existe' } });
  
        res.status(200).json({ error : false, data : data.toJSON() })
  
      })
      .catch(function(err){
        res.status(500).json({ error : false, data : {message : err.message} })
      })
  
  }

  exports.findOneDocumentByAbogado = (req,res) => {

    let conditions = { abogado_id: req.params.abogado_id };
  
    Vista_agenda.where(conditions).fetchAll()
      .then(function(data){
        if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion no existe' } });
  
        res.status(200).json({ error : false, data : data.toJSON() })
  
      })
      .catch(function(err){
        res.status(500).json({ error : false, data : {message : err.message} })
      })
  
  }

  exports.findOneDocumentByServicio = (req,res) => {

    let conditions = { servicio_id: req.params.servicio_id };
  
    Vista_agenda.where(conditions).fetchAll()
      .then(function(data){
        if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion no existe' } });
  
        res.status(200).json({ error : false, data : data.toJSON() })
  
      })
      .catch(function(err){
        res.status(500).json({ error : false, data : {message : err.message} })
      })
  
  }