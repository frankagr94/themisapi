//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Cliente = require('../models/cliente');


  exports.findOneDocument = (req,res) => {

  let conditions = { id_cliente: req.params.id };

  Cliente.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}