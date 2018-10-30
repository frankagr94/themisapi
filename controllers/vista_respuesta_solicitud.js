//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_respuesta_solicitud = require('../models/vista_respuesta_solicitud');

exports.findDocuments = (req,res) => {
  
  Vista_respuesta_solicitud.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_respuesta_solicitud.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_respuesta_solicitud no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}