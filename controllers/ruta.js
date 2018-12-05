//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const ruta = require('../models/ruta');

exports.findRutas = (req,res) => {
  
  ruta.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createRuta = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    descripcion:        req.body.descripcion
  }

  ruta.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'ruta creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneRuta = (req,res) => {

  let conditions = { id: req.params.id };

  ruta.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'ruta no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateRuta = (req,res) => {

  let conditions = { id: req.params.id };

  ruta.forge(conditions).fetch()
    .then(function(ruta){
      if(!ruta) return res.status(404).json({ error : true, data : { message : 'ruta no existe' } });

      let updateData = {
        descripcion:        req.body.descripcion,
        nombre:             req.body.nombre
      }
      
      ruta.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'ruta actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteRuta = (req,res) => {

  let conditions = { id: req.params.id };

  ruta.forge(conditions).fetch()
    .then(function(ruta){
      if(!ruta) return res.status(404).json({ error : true, data : { message : 'ruta no existe' } });

      ruta.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'ruta eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}