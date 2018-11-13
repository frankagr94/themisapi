//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const catalogo_servicio = require('../models/catalogo_servicio');

exports.findDocuments = (req,res) => {
  
  catalogo_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    categoria_servicio_id: req.body.categoria_servicio_id,
    nombre:                req.body.nombre,
    descripcion:           req.body.descripcion,
    estatus:               req.body.estatus,
    //fecha_creacion:        req.body.fecha_creacion,
  }

  catalogo_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'catalogo_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  catalogo_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'catalogo_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  catalogo_servicio.forge(conditions).fetch()
    .then(function(catalogo_servicio){
      if(!catalogo_servicio) return res.status(404).json({ error : true, data : { message : 'catalogo_servicio no existe' } });

      let updateData = {
        categoria_servicio_id: req.body.categoria_servicio_id,
        nombre:                req.body.nombre,
        descripcion:           req.body.descripcion,
        estatus:               req.body.estatus,
        fecha_creacion:        req.body.fecha_creacion,
      }
      
      catalogo_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'catalogo_servicio actualizado'} });
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

  catalogo_servicio.forge(conditions).fetch()
    .then(function(catalogo_servicio){
      if(!catalogo_servicio) return res.status(404).json({ error : true, data : { message : 'catalogo_servicio no existe' } });

      catalogo_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'catalogo_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}