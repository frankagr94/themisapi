//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_empleados_categoria = require('../models/vista_empleados_categoria');

exports.findDocuments = (req,res) => {
  
  Vista_empleados_categoria.forge().fetchAll({ withRelated: ['empleados'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_empleados_categoria.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'categoria_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}