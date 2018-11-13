//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_garantia = require('../models/tipo_garantia');

exports.findDocuments = (req,res) => {
  
  Tipo_garantia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:         req.body.nombre,
    estatus:        'A'
  }

  Tipo_garantia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_garantia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_garantia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_garantia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_garantia.forge(conditions).fetch()
    .then(function(tipo_garantia){
      if(!tipo_garantia) return res.status(404).json({ error : true, data : { message : 'tipo_garantia no existe' } });

      let updateData = {
        nombre:            req.body.nombre
      }
      
      tipo_garantia.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_garantia actualizado'} });
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

  Tipo_garantia.forge(conditions).fetch()
    .then(function(tipo_garantia){
      if(!tipo_garantia) return res.status(404).json({ error : true, data : { message : 'tipo_garantia no existe' } });

      tipo_garantia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_garantia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}