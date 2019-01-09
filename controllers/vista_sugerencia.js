//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_sugerencia = require('../models/vista_sugerencia');

exports.findDocuments = (req,res) => {
  
  Vista_sugerencia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { sugerencia_id: req.params.id };

  Vista_sugerencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_sugerencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}