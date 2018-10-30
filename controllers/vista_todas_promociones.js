//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_todas_promociones = require('../models/vista_todas_promociones');

exports.findDocuments = (req,res) => {
  
  Vista_todas_promociones.forge().fetchAll({ withRelated: ['detalle_promocion'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { promocion: req.params.id };

  Vista_todas_promociones.forge(conditions).fetch({ withRelated: ['detalle_promocion'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_todas_promociones no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}