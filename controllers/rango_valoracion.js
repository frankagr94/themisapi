//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Rango_valoracion = require('../models/rango_valoracion');

exports.findDocuments = (req,res) => {
  
  Rango_valoracion.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    valor:           req.body.valor,
    imagen:          req.body.imagen,
    descripcion:     req.body.descripcion
  }

  Rango_valoracion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'valoracion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Rango_valoracion.forge(conditions).fetch()
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

  Rango_valoracion.forge(conditions).fetch()
    .then(function(rango_valoracion){
      if(!rango_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      /* let updateData = {
        valo_id:        req.body.valor,
        imagen:          req.body.imagen,
        descripcion:     req.body.descripcion
      } */
      
      rango_valoracion.save(req.body)
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

  Rango_valoracion.forge(conditions).fetch()
    .then(function(rango_valoracion){
      if(!rango_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      rango_valoracion.destroy()
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