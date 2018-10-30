//----dependencias------  
'use strict'
const Tipo_parametro = require('../models/tipo_parametro');
const Categoria_parametro = require('../models/categoria_parametro');

exports.agregar = (req,res) => {

  let newTipPar = {
    nombre:              req.body.nombre,
    descripcion:         req.body.descripcion,
    clasificacion:       req.body.clasificacion,
  }

  Tipo_parametro.forge(newTipPar).save()
  .then(function(tipo_parametro){

        if(req.body.categoria_servicio){

          for (var i = 0; i < req.body.categoria_servicio.length; i++) {
            
            let newCatPar = {
              id_tipo_parametro:      tipo_parametro.id,
              id_categoria_servicio:  req.body.categoria_servicio[i],
            }

            Categoria_parametro.forge(newCatPar).save()
            .then(function(ser){
                console.log('Categoria_parametro guardado')
            })
            .catch(function (err) {
                console.log(err);
            });

          }

        }
    
    res.status(200).json({ error: false, data: { message: 'tipo_parametro creado' } });

  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}