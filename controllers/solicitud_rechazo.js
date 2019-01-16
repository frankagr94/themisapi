//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Solicitud_rechazo = require('../models/solicitud_rechazo');
const util = require('../middlewares/utils')

exports.findSolicitud_rechazos = (req,res) => {
  
  Solicitud_rechazo.fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}


exports.createSolicitud_rechazo = (req,res) => {

  let newData = {
    tipo_respuesta_id:  req.body.tipo_respuesta_id,
    solicitud_id:       req.body.solicitud_id,
    descripcion:        req.body.descripcion,
  }
  Solicitud_rechazo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'solicitud_rechazo Enviada' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneSolicitud_rechazo = (req,res) => {

  let conditions = { id: req.params.id };

  Solicitud_rechazo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'La solicitud_rechazo No Existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.updateSolicitud_rechazo = (req,res) => {

  let conditions = { id: req.params.id };

  Solicitud_rechazo.forge(conditions).fetch()
    .then(function(solicitud_rechazo){
      if(!solicitud_rechazo) return res.status(404).json({ error : true, data : { message : 'solicitud_rechazo no existe' } });

      solicitud_rechazo.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'solicitud_rechazo actualizada'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deletesolicitud_rechazo = (req,res) => {

  let conditions = { id: req.params.id };

  Solicitud_rechazo.forge(conditions).fetch()
    .then(function(solicitud_rechazo){
      if(!solicitud_rechazo) return res.status(404).json({ error : true, data : { message : 'solicitud_rechazo no existe' } });

      solicitud_rechazo.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'solicitud_rechazo eliminada'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}