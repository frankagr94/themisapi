//----dependencias------  
'use strict'
const Promocion = require('../models/promocion');
const Detalle_promocion = require('../models/detalle_promocion');
const fs = require("fs");

exports.agregar = (req,res) => {

  // ----- Extension Imagen -----
  if(req.files.archivo) {
    var extension = req.files.archivo.name.split(".").pop();
  }else{
    var extension = null;
  }

  let newPromocion = {
    id_servicio:          req.body.id_servicio,
    nombre:               req.body.nombre,
    descripcion:          req.body.descripcion,
    porcentaje_descuento: req.body.porcentaje_descuento,
    precio_promocion:     req.body.precio_promocion,
    imagen:               extension,
    fecha_inicio:         req.body.fecha_inicio,
    fecha_fin:            req.body.fecha_fin,
    visible:              req.body.visible,
    estado:               req.body.estado,
  }

  Promocion.forge(newPromocion).save()
  .then(function(promocion){

        // ----- Guardar Imagen -----
        if(req.files.archivo) fs.rename(req.files.archivo.path, "files/promocion/"+promocion.id+"."+extension);

        if(req.body.valor_parametro){

          for (var i = 0; i < req.body.valor_parametro.length; i++) {
            
            let newDetPro = {
              id_promocion:         promocion.id,
              id_valor_parametro:   req.body.valor_parametro[i],
            }

            Detalle_promocion.forge(newDetPro).save()
            .then(function(ser){
                console.log('detalle_promocion guardado')
            })
            .catch(function (err) {
                console.log(err);
            });

          }

        }
    
    res.status(200).json({ error: false, data: { message: 'promocion creado' } });

  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}