//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_actuacion_catalogo = require('../models/vista_actuacion_catalogo');

exports.findDocuments = (req,res) => {
  
  Vista_actuacion_catalogo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { actuacion_catalogo_id: req.params.id };

  Vista_actuacion_catalogo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_actuacion_catalogo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByCatalogoId = (req,res) => {

  let conditions = { catalogo_servicio_id: req.params.catalogo_servicio_id };

  Vista_actuacion_catalogo.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_actuacion_catalogo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}