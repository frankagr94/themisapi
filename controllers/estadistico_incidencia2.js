//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Estadistico_incidencia2 = require('../models/estadistico_incidencia2');

exports.findDocuments = (req,res) => {
  
  Estadistico_incidencia2.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

