//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_reclamo = require('../models/reporte_reclamo');

exports.findDocuments = (req,res) => {
  
  Reporte_reclamo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

