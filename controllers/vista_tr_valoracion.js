//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_tr_valoracion = require('../models/vista_tr_valoracion');

exports.findDocuments = (req,res) => {
  
  Vista_tr_valoracion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { tr_id: req.params.id };

  Vista_tr_valoracion.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_tr_valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByCatalogo = (req,res) => {

  let conditions = { catalogo_servicio_id: req.params.catalogo_servicio_id };

  Vista_tr_valoracion.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_tr_valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

