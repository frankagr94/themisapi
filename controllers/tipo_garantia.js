//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_garantia = require('../models/tipo_garantia');

exports.findTipo_garantias = (req,res) => {
  
  Tipo_garantia.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createTipo_garantia = (req,res) => {

  let newData = {
    nombre:         req.body.nombre,
    descripcion:    req.body.descripcion,
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

exports.findOneTipo_garantia = (req,res) => {

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

exports.updateTipo_garantia = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_garantia.forge(conditions).fetch()
    .then(function(tipo_garantia){
      if(!tipo_garantia) return res.status(404).json({ error : true, data : { message : 'tipo_garantia no existe' } });

      tipo_garantia.save(req.body)
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

exports.cambiarEstatus = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_garantia.forge(conditions).fetch()
    .then(function(tipo_garantia){
      if(!tipo_garantia) return res.status(404).json({ error : true, data : { message : 'tipo de garantia no existe' } });
      tipo_garantia.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de garantia actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteTipo_garantia = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_garantia.forge(conditions).fetch()
    .then(function(tipo_garantia){
      if(!tipo_garantia) return res.status(404).json({ error : true, data : { message : 'tipo_garantia no existe' } });

      tipo_garantia.save({estatus:'I'})
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