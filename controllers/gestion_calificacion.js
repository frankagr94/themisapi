//----dependencias------  
'use strict'
const Calificacion_servicio = require('../models/calificacion_servicio');
const Calificacion_orden = require('../models/calificacion_orden');


exports.calificar = (req,res) => {

    //--------- Calificar orden ---------
    var arregloServ = req.body.servicios_calificados;

    for (var i = 0; i < arregloServ.length; i++) {

          let newData = {
            id_detalle_servicio:    arregloServ[i].id,
            puntuacion:             arregloServ[i].puntuacion,
          }

          Calificacion_servicio.forge(newData).save()
          .then(function(perfil){
            console.log('servicio calificado')
          })
          .catch(function (err) {
              console.log(err);
          });
        
    }

    //--------- Calificar Criterio ---------
    var arregloCri = req.body.criterios_calificados;

    for (var i = 0; i < arregloCri.length; i++) {

          let newData2 = {
            id_criterio:            arregloCri[i].id,
            id_orden_servicio:      req.body.id_orden_servicio,
            puntuacion:             arregloCri[i].puntuacion,
          }

          Calificacion_orden.forge(newData2).save()
          .then(function(perfil){
            console.log('Criterio calificado')
          })
          .catch(function (err) {
              console.log(err);
          });
        
    }

    //Respuesta
    res.status(200).json({ error: false, data: { message: 'Servicios y Criterios Calificados' } });
}