//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_incidencia = require('../models/vista_incidencia');

exports.findDocuments = (req,res) => {
  
  Vista_incidencia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { incidencia_id: req.params.id };

  Vista_incidencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_incidencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findiIncidenciaByCliente = (req,res) => {

  let conditions = { cliente_id: req.params.cliente_id };

  Vista_incidencia.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_incidencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}