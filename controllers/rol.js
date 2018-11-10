//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Rol = require('../models/rol');

exports.findDocuments = (req,res) => {
  
  Rol.forge().fetch({
    withRelated:[
      'funciones'
    ]
  })
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
    estatus:            'A',
  }
  let funcion = {
    nombre:             req.body.nombre_funcion,
    //status:             'A'
  }

  Rol.forge(newData).save()
  .then(function(rol){
    rol.funciones().attach(req.body.funcion_id)
      .then(function(data){
        res.status(200).json({ error: false, data: { message: 'rol creado' } });
      })
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Rol.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'rol no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Rol.forge(conditions).fetch()
    .then(function(rol){
      if(!rol) return res.status(404).json({ error : true, data : { message : 'rol no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        estatus:            req.body.estatus,
      }
      
      rol.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'rol actualizado'} });
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

  Rol.forge(conditions).fetch()
    .then(function(rol){
      if(!rol) return res.status(404).json({ error : true, data : { message : 'rol no existe' } });

      rol.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'rol eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}