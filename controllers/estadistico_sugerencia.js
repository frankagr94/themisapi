//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Estadistico_sugerencia = require('../models/estadistico_sugerencia');

exports.findDocuments = (req,res) => {
  
  Estadistico_sugerencia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

