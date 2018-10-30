//----dependencias------  
'use strict'
const Servicio = require('../models/servicio');
const Servicio_parametro = require('../models/servicio_parametro');
const fs = require("fs");

exports.agregar = (req,res) => {

 // ----- Extension Imagen -----
  if(req.files.archivo) {
    var extension = req.files.archivo.name.split(".").pop();
  }else{
    var extension = null;
  }

  let newServicio = {
    imagen:             extension,
    id_tipo_servicio:   req.body.id_tipo_servicio,
    nombre:             req.body.nombre,
    precio:             req.body.precio,
    descripcion:        req.body.descripcion,
    duracion:           req.body.duracion,
    visible:            req.body.visible,
  }

  Servicio.forge(newServicio).save()
  .then(function(servicio){

        // ----- Guardar Imagen -----
        if(req.files.archivo) fs.rename(req.files.archivo.path, "files/servicio/"+data.id+"."+extension);

        if(req.body.valor_parametro){

          for (var i = 0; i < req.body.valor_parametro.length; i++) {
            
            let newSerPar = {
              id_servicio:          servicio.id,
              id_valor_parametro:   req.body.valor_parametro[i],
            }

            Servicio_parametro.forge(newSerPar).save()
            .then(function(ser){
                console.log('servicio_parametro guardado')
            })
            .catch(function (err) {
                console.log(err);
            });

          }

        }
    
    res.status(200).json({ error: false, data: { message: 'servicio creado' } });

  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}