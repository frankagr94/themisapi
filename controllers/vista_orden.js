//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const vista_orden = require('../models/vista_orden');

exports.findDocuments = (req,res) => {
  
  vista_orden.forge().fetchAll({ withRelated: ['servicios_realizados'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  vista_orden.forge(conditions).fetch({ withRelated: ['servicios_realizados'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_orden no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}