//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_empleado = require('../models/tipo_empleado');
const utils = require('./../middlewares/utils');

exports.findDocuments = (req,res) => {
  
  Tipo_empleado.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    fecha_creacion:     utils.fecha(),
    estatus:            'A',
  }

  Tipo_empleado.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_empleado creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_empleado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_empleado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_empleado.forge(conditions).fetch()
    .then(function(tipo_empleado){
      if(!tipo_empleado) return res.status(404).json({ error : true, data : { message : 'tipo_empleado no existe' } });
      
      tipo_empleado.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_empleado actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.cambiarEstatus = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_empleado.forge(conditions).fetch()
    .then(function(tipo_empleado){
      if(!tipo_empleado) return res.status(404).json({ error : true, data : { message : 'tipo de empleado no existe' } });
      tipo_empleado.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de empleado actualizado'} });
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

  Tipo_empleado.forge(conditions).fetch()
    .then(function(tipo_empleado){
      if(!tipo_empleado) return res.status(404).json({ error : true, data : { message : 'tipo_empleado no existe' } });

      tipo_empleado.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_empleado eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}