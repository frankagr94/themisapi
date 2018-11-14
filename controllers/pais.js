//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Pais = require('../models/pais');

exports.findDocuments = (req,res) => {
  
  Pais.forge().fetchAll()
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
    estatus:            req.body.estatus
  }

  Pais.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'pais creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  pais.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'pais no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Pais.forge(conditions).fetch()
    .then(function(pais){
      if(!pais) return res.status(404).json({ error : true, data : { message : 'pais no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        estatus:            req.body.estatus
      }
      
      pais.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'pais actualizado'} });
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

  Pais.forge(conditions).fetch()
    .then(function(pais){
      if(!pais) return res.status(404).json({ error : true, data : { message : 'pais no existe' } });

      pais.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'pais eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}