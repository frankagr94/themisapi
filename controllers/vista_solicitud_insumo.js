//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_solicitud_insumo = require('../models/vista_solicitud_insumo');

exports.findDocuments = (req,res) => {
  
  Vista_solicitud_insumo.forge().fetchAll({ withRelated: ['servicios_solicitados','servicios_solicitados.insumos_asociados'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_solicitud_insumo.forge(conditions).fetch({ withRelated: ['servicios_solicitados','servicios_solicitados.insumos_asociados'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_solicitud_insumo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}