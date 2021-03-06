//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Respuesta_reclamo = require('../models/respuesta_reclamo');

exports.findDocuments = (req,res) => {
  
  Respuesta_reclamo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    reclamo_id:                 req.body.id_reclamo,
    tipo_respuesta_id:          req.body.tipo_respuesta_id,
    fecha_creacion:             req.body.fecha_creacion,
  }

  Respuesta_reclamo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'respuesta_reclamo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_reclamo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'respuesta_reclamo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_reclamo.forge(conditions).fetch()
    .then(function(respuesta_reclamo){
      if(!respuesta_reclamo) return res.status(404).json({ error : true, data : { message : 'respuesta_reclamo no existe' } });

      respuesta_reclamo.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'respuesta_reclamo actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_reclamo.forge(conditions).fetch()
    .then(function(respuesta_reclamo){
      if(!respuesta_reclamo) return res.status(404).json({ error : true, data : { message : 'respuesta_reclamo no existe' } });

      respuesta_reclamo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'respuesta_reclamo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}