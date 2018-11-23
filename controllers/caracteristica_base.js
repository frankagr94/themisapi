//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Caracteristica_base = require('../models/caracteristica_base');

exports.findDocuments = (req,res) => {
  
  Caracteristica_base.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:          req.body.nombre,
    descripcion:     req.body.descripcion,
    estatus:         'A'
  }

  caracteristica_base.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'caracteristica base creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Caracteristica_base.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'caracteristica base no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Caracteristica_base.forge(conditions).fetch()
    .then(function(caracteristica_base){
      if(!caracteristica_base) return res.status(404).json({ error : true, data : { message : 'caracteristica base no existe' } });

      let updateData = {
        nombre:          req.body.nombre,
        descripcion:     req.body.descripcion
      }
      
      caracteristica_base.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'caracteristica base actualizado'} });
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

  Caracteristica_base.forge(conditions).fetch()
    .then(function(caracteristica_base){
      if(!caracteristica_base) return res.status(404).json({ error : true, data : { message : 'caracteristica base no existe' } });
      caracteristica_base.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus de la caracteristica base actualizado'} });
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

  Caracteristica_base.forge(conditions).fetch()
    .then(function(caracteristica_base){
      if(!caracteristica_base) return res.status(404).json({ error : true, data : { message : 'caracteristica base no existe' } });

      caracteristica_base.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'caracteristica base eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}