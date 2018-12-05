//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Estado_civil = require('../models/estado_civil');

exports.findEstado_civils = (req,res) => {
  
  Estado_civil.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createEstado_civil = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    estatus:            req.body.estatus,
  }

  Estado_civil.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'estado civil creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneEstado_civil = (req,res) => {

  let conditions = { id: req.params.id };

  Estado_civil.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'estado civil no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateEstado_civil = (req,res) => {

  let conditions = { id: req.params.id };

  Estado_civil.forge(conditions).fetch()
    .then(function(estado_civil){
      if(!estado_civil) return res.status(404).json({ error : true, data : { message : 'estado civil no existe' } });

      estado_civil.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estado civil actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteEstado_civil = (req,res) => {

  let conditions = { id: req.params.id };

  estado_civil.forge(conditions).fetch()
    .then(function(estado_civil){
      if(!estado_civil) return res.status(404).json({ error : true, data : { message : 'estado civil no existe' } });

      estado_civil.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'estado civil eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}