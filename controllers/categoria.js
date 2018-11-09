//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Categoria = require('../models/categoria');

exports.findDocuments = (req,res) => {
  
  Categoria.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:                req.body.nombre,
    descripcion:           req.body.descripcion,
    imagen:                req.body.imagen,
    estatus:               req.body.estatus,
  }

  Categoria.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'categoria creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'categoria no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria.forge(conditions).fetch()
    .then(function(categoria){
      if(!categoria) return res.status(404).json({ error : true, data : { message : 'categoria no existe' } });

      let updateData = {
        nombre:                req.body.nombre,
        descripcion:           req.body.descripcion,
        imagen:                req.body.imagen,
        estatus:               req.body.estatus,
      }
      
      categoria.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'categoria actualizado'} });
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

  Categoria.forge(conditions).fetch()
    .then(function(categoria){
      if(!categoria) return res.status(404).json({ error : true, data : { message : 'categoria no existe' } });

      categoria.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'categoria eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}