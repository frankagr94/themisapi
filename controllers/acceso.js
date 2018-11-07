//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Acceso = require('../models/acceso');

exports.findDocuments = (req,res) => {
  
  Acceso.forge().fetchAll()
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
    estatus:                req.body.estatus,
  }

  Acceso.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'acceso creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Acceso.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'acceso no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Acceso.forge(conditions).fetch()
    .then(function(acceso){
      if(!acceso) return res.status(404).json({ error : true, data : { message : 'acceso no existe' } });

      let updateData = {
        nombre:                 req.body.nombre,
        estatus:                req.body.estatus,
      }
      
      acceso.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'acceso actualizado'} });
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

  Acceso.forge(conditions).fetch()
    .then(function(acceso){
      if(!acceso) return res.status(404).json({ error : true, data : { message : 'acceso no existe' } });

      acceso.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'acceso eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}