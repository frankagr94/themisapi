//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_todos_servicios = require('../models/vista_todos_servicios');

exports.findDocuments = (req,res) => {
  
  Vista_todos_servicios.forge().fetchAll({ withRelated: ['detalle_servicio'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { promocion: req.params.id };

  Vista_todos_servicios.forge(conditions).fetch({ withRelated: ['detalle_servicio'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_todos_servicios no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}