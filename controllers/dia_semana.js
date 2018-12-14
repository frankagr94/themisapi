//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Dia_semana = require('../models/dia_semana');

exports.findDia_semanas = (req,res) => {
  
  Dia_semana.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDia_semana = (req,res) => {

  let newData = {
    nombre:          req.body.nombre,
    estatus:        'A',
  }

  Dia_semana.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'dia semana creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDia_semana = (req,res) => {

  let conditions = { id: req.params.id };

  Dia_semana.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'dia semana no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDia_semana = (req,res) => {

  let conditions = { id: req.params.id };

  Dia_semana.forge(conditions).fetch()
    .then(function(dia_semana){
      if(!dia_semana) return res.status(404).json({ error : true, data : { message : 'dia semana no existe' } });

      dia_semana.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'dia semana actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteDia_semana = (req,res) => {

  let conditions = { id: req.params.id };

  Dia_semana.forge(conditions).fetch()
    .then(function(dia_semana){
      if(!dia_semana) return res.status(404).json({ error : true, data : { message : 'dia semana no existe' } });

      dia_semana.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'dia semana eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}