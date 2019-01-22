//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_servicio = require('../models/reporte_servicio');

exports.findDocuments = (req,res) => {
  
  Reporte_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

