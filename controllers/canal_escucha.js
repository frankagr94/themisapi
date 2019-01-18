//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Canal_escucha = require('../models/canal_escucha');

exports.findDocuments = (req,res) => {
  
  Canal_escucha.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    tipo_respuesta_id:       req.body.servicio_id,
    correo_emiso:            req.body.correo_emiso,
    descripcion:             req.body.descripcion,
    fecha:                   req.body.fecha,
    estatus:                 'P'
  }

  Canal_escucha.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'canal_escucha creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Canal_escucha.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'canal_escucha no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Canal_escucha.forge(conditions).fetch()
    .then(function(canal_escucha){
      if(!canal_escucha) return res.status(404).json({ error : true, data : { message : 'canal_escucha no existe' } });

      canal_escucha.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'canal_escucha actualizado'} });
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

  Canal_escucha.forge(conditions).fetch()
    .then(function(canal_escucha){
      if(!canal_escucha) return res.status(404).json({ error : true, data : { message : 'canal_escucha no existe' } });

      canal_escucha.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'valoracion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}