//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Pais = require('../models/pais');

exports.findPaises = (req,res) => {
  
  Pais.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createPais = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    estatus:            'A'
  }

  Pais.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'pais creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOnePais = (req,res) => {

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

exports.updatePais = (req,res) => {

  let conditions = { id: req.params.id };

  Pais.forge(conditions).fetch()
    .then(function(pais){
      if(!pais) return res.status(404).json({ error : true, data : { message : 'pais no existe' } });

      pais.save(req.body)
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

exports.deletePais = (req,res) => {

  let conditions = { id: req.params.id };

  Pais.forge(conditions).fetch()
    .then(function(pais){
      if(!pais) return res.status(404).json({ error : true, data : { message : 'pais no existe' } });

      pais.save({estatus:'I'})
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