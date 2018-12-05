//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Rol = require('../models/rol');

exports.findRols = (req,res) => {
  
  Rol.where({estatus:'A'||'a'}).fetchAll({
    withRelated:[
      'funciones',
      'funciones.ruta'
    ]
  })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createRol = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    estatus:            'A',
  }
  
  Rol.forge(newData).save()
  .then(function(data){
      res.status(200).json({ error: false, data: { message: 'rol creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.asociar = (req, res)=>{
  let conditions = { id: req.body.id_rol};

  Rol.forge(conditions).fetch()
    .then(function(rol){
      rol.funciones().attach(req.body.id_funcion)
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'Funciones associadas al rol' } });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err.message} });
    })
}

exports.findOneRol = (req,res) => {

  let conditions = { id: req.params.id };

  Rol.forge(conditions).fetch({
    withRelated: ['funciones']
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'rol no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateRol = (req,res) => {

  let conditions = { id: req.params.id };

  Rol.forge(conditions).fetch()
    .then(function(rol){
      if(!rol) return res.status(404).json({ error : true, data : { message : 'rol no existe' } });

      rol.save(req.body)
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

exports.cambiarEstatus = (req,res) => {

  let conditions = { id: req.params.id };

  Rol.forge(conditions).fetch()
    .then(function(rol){
      if(!rol) return res.status(404).json({ error : true, data : { message : 'rol no existe' } });
      rol.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del rol actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteRol = (req,res) => {

  let conditions = { id: req.params.id };

  Rol.forge(conditions).fetch()
    .then(function(rol){
      if(!rol) return res.status(404).json({ error : true, data : { message : 'rol no existe' } });

      rol.save({estatus:'I'})
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