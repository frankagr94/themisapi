//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_recaudo_servicio = require('../models/vista_recaudo_servicio');

exports.findDocuments = (req,res) => {
  
  Vista_recaudo_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocumentByServicio = (req,res) => {

  let conditions = { servicio_id: req.params.id };

  Vista_recaudo_servicio.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_recaudo_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}