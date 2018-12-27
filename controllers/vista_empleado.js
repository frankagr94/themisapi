//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_empleado = require('../models/vista_empleado');

exports.findEmpleados = (req,res) => {
  
  Vista_empleado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneEmpleado = (req,res) => {

  let conditions = { empleado_id: req.params.id };

  Vista_empleado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_empleado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}