//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_usuario = require('../models/vista_usuario');

exports.findDocuments = (req,res) => {
  
  Vista_usuario.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { usuario_id: req.params.id };

  Vista_usuario.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_usuario no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}