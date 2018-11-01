//----dependencias------  
'use strict'
const Consejo = require('../models/consejo');
const Detalle_consejo = require('../models/detalle_consejo');
const fs = require("fs");

exports.agregar = (req,res) => {

  // ----- Extension Imagen -----
  if(req.files.archivo) {
    var extension = req.files.archivo.name.split(".").pop();
  }else{
    var extension = null;
  }

  let newConsejo = {
    titulo:          req.body.titulo,
    descripcion:     req.body.descripcion,
    imagen:          extension,
    autor:           req.body.autor,
    id_sistema:      req.body.id_sistema,
    visible:         req.body.visible
  }

  Consejo.forge(newConsejo).save()
  .then(function(consejo){

        // ----- Guardar Imagen -----
        if(req.files.archivo) fs.rename(req.files.archivo.path, "files/consejo/"+consejo.id+"."+extension);

        if(req.body.valor_parametro){

          for (var i = 0; i < req.body.valor_parametro.length; i++) {
            
            let newDetCon = {
              id_consejo:           consejo.id,
              id_valor_parametro:   req.body.valor_parametro[i],
            }

            Detalle_consejo.forge(newDetCon).save()
            .then(function(ser){
                console.log('detalle_consejo guardado')
            })
            .catch(function (err) {
                console.log(err);
            });

          }

        }
    
    res.status(200).json({ error: false, data: { message: 'consejo creado' } });

  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}