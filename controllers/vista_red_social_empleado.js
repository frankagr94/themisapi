//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_red_social_empleado = require('../models/vista_red_social_empleado');

exports.findDocuments = (req,res) => {
  
  Vista_red_social_empleado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

