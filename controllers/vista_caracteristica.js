'use strict' //de uso estricto para el servidor
//const bcrypt = require("bcryptjs"); se usa para encriptar contraseña, aqui no es necesario 
const Vista_caracteristica = require('../models/vista_caracteristica');

//next para encdenar a otra funcion
exports.findcaracteristicas = (req,res, next) => {
  
  Vista_caracteristica.forge().fetchAll()
  .then(function(data){
  	 if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });
    res.status(200).json({ error : false, data : data });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}




