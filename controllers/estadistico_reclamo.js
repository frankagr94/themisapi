//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Estadistico_reclamo = require('../models/estadistico_reclamo');

exports.findDocuments = (req,res) => {
  
  Estadistico_reclamo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

