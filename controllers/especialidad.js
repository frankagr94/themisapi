//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Especialidad = require('../models/especialidad');
const util = require('../middlewares/utils');

exports.findDocuments = (req,res) => {
  
  Especialidad.where({estatus:'A'||'a'}).fetchAll({
    withRelated: [
      'categorias',
      'categorias.catalogo'
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
    nombre:                 req.body.nombre,
    fecha_creacion:         util.fecha(),
    estatus:                'A',
  }

  Especialidad.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'especialidad creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Especialidad.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'especialidad no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Especialidad.forge(conditions).fetch()
    .then(function(especialidad){
      if(!especialidad) return res.status(404).json({ error : true, data : { message : 'especialidad no existe' } });

      /* let updateData = {
        nombre:                 req.body.nombre,
        fecha_creacion:         req.body.fecha_creacion,
        estatus:                req.body.estatus,
      } */
      
      especialidad.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'especialidad actualizado'} });
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

  Especialidad.forge(conditions).fetch()
    .then(function(especialidad){
      if(!especialidad) return res.status(404).json({ error : true, data : { message : 'especialidad no existe' } });
      especialidad.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus de la especialidad actualizado'} });
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

  Especialidad.forge(conditions).fetch()
    .then(function(especialidad){
      if(!especialidad) return res.status(404).json({ error : true, data : { message : 'especialidad no existe' } });

      especialidad.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'especialidad eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}