//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Funcion = require('../models/funcion');

exports.findFuncions = (req,res) => {
  
  Funcion.where({estatus:'A'||'a'}).fetchAll({
    withRelated : [
      'ruta'
    ]
  })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createFuncion = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    estatus:            req.body.estatus,
    funcion_id:         req.body.funcion_id, 
    ruta_id:            req.body.ruta_id
  }

  Funcion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'funcion creada' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneFuncion = (req,res) => {

  let conditions = { id: req.params.id };

  Funcion.forge(conditions).fetch({
    withRelated:[
      'ruta'
    ]
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'funcion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateFuncion = (req,res) => {

  let conditions = { id: req.params.id };

  Funcion.forge(conditions).fetch()
    .then(function(funcion){
      if(!funcion) return res.status(404).json({ error : true, data : { message : 'funcion no existe' } });

      funcion.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'funcion actualizada'} });
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

  Funcion.forge(conditions).fetch()
    .then(function(funcion){
      if(!funcion) return res.status(404).json({ error : true, data : { message : 'funcion no existe' } });
      funcion.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus de la funcion actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteFuncion = (req,res) => {

  let conditions = { id: req.params.id };

  Funcion.forge(conditions).fetch()
    .then(function(funcion){
      if(!funcion) return res.status(404).json({ error : true, data : { message : 'funcion no existe' } });

      funcion.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'funcion eliminada'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}