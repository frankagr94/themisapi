//----dependencias------  
'use strict'
const Solicitud = require('../models/solicitud');
const Servicio_solicitado = require('../models/servicio_solicitado');

exports.agregar = (req,res) => {

  let newSolicitud = {
    id_cliente:         req.body.id_cliente,
    id_promocion:       req.body.id_promocion,
    estado:             req.body.estado,
    empleado:           req.body.empleado,
    sexo:               req.body.sexo,
  }

  Solicitud.forge(newSolicitud).save()
  .then(function(solicitud){

        if(req.body.servicio){

          for (var i = 0; i < req.body.servicio.length; i++) {

            let newSerSol = {
              id_servicio:        req.body.servicio[i],
              id_solicitud:       solicitud.id,
            }

            Servicio_solicitado.forge(newSerSol).save()
            .then(function(ser){
                console.log('Servicio_solicitado guardado')
            })
            .catch(function (err) {
                console.log(err);
            });

          }

        }
    
    res.status(200).json({ error: false, data: { message: 'solicitud creado' } });

  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}