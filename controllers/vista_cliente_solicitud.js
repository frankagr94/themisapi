//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_cliente_solicitud = require('../models/vista_cliente_solicitud');

exports.findDocuments = (req,res) => {
  
  Vista_cliente_solicitud.forge().fetchAll({ withRelated: ['solicitudes', 'solicitudes.servicios_solicitados'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_cliente_solicitud.forge(conditions).fetch({ withRelated: ['solicitudes', 'solicitudes.servicios_solicitados'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}