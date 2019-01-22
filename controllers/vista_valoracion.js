//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_valoracion = require('../models/vista_valoracion');

exports.findDocuments = (req,res) => {
  
Vista_valoracion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findDocumentsByTipoServicio = (req,res) => {
    let conditions ={tipo_servicio_id: req.params.tipo_servicio_id};
    
    Vista_valoracion.where(conditions).fetchAll()
      .then(function(data){
        res.status(200).json({ error : false, data : data.toJSON() });
      })
      .catch(function (err) {
        res.status(500).json({ error: true, data: {message: err.message} });
      });
    
    }