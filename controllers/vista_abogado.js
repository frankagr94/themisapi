//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_abogado = require('../models/vista_abogado');

exports.findDocuments = (req,res) => {
  
  Vista_abogado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { abogado_id: req.params.id };

  Vista_abogado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_abogado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findAbogadoByEspecialidad = (req,res) => {

  let conditions = { especialidad_id: req.params.especialidad_id };

  Vista_abogado.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_abogado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}