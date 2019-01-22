//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Empresa = require('../models/empresa');
const fs = require("fs");

exports.findEmpresas = (req,res) => {
  
  Empresa.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createEmpresa = (req,res) => {

  let newData = {
    rif:                  req.body.rif,
    nombre:               req.body.nombre,
    hora_inicio:          req.body.hora_inicio,
    hora_cierre:          req.body.hora_cierre,
    estatus:              'A',
    facebook:             req.body.facebook,
    twitter:              req.body.twitter,
    instagram:            req.body.instagram,
    direccion:            req.body.direccion,
    correo:               req.body.correo,
    telefono1:            req.body.telefono1,
    telefono2:            req.body.telefono2
  }

  Empresa.forge(newData).save()
  .then(function(data){

    res.status(200).json({ error: false, data: { message: 'empresa creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneEmpresa = (req,res) => {

  let conditions = { id: req.params.id };

  Empresa.forge(conditions).fetch({
    withRelated: [
      'empleados',
      'inicio_web'
    ]
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'empresa no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateEmpresa = (req,res) => {

  let conditions = { id: req.params.id };

  Empresa.forge(conditions).fetch()
    .then(function(empresa){
      if(!empresa) return res.status(404).json({ error : true, data : { message : 'empresa no existe' } });

      empresa.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'empresa actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteEmpresa = (req,res) => {

  let conditions = { id: req.params.id };

  Empresa.forge(conditions).fetch()
    .then(function(empresa){
      if(!empresa) return res.status(404).json({ error : true, data : { message : 'empresa no existe' } });

      empresa.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'empresa eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}