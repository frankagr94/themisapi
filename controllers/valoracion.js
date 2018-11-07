//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Valoracion = require('../models/valoracion');

exports.findDocuments = (req,res) => {
  
  Valoracion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_servicio:             req.body.id_servicio,
    id_tipo_val_rango_val:   req.body.id_tipo_val_rango_val,
    fecha:                   req.body.fecha
  }

  Valoracion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'valoracion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Valoracion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Valoracion.forge(conditions).fetch()
    .then(function(valoracion){
      if(!valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      let updateData = {
        id_servicio:             req.body.id_servicio,
        id_tipo_val_rango_val:   req.body.id_tipo_val_rango_val,
        fecha:                   req.body.fecha
      }
      
      valoracion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'valoracion actualizado'} });
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

  Valoracion.forge(conditions).fetch()
    .then(function(valoracion){
      if(!valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      valoracion.destroy()
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