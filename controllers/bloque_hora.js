//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Bloque_hora = require('../models/bloque_hora');

exports.findBloque_horas = (req,res) => {
  
  Bloque_hora.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createBloque_hora = (req,res) => {

  let newData = {
    hora_inicio:        req.body.hora_inicio,
    hora_fin:          req.body.hora_fin,
    estatus:           'A'
  }

  Bloque_hora.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'bloque de hora creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneBloque_hora = (req,res) => {

  let conditions = { id: req.params.id };

  Bloque_hora.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'bloque de hora no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateBloque_hora = (req,res) => {

  let conditions = { id: req.params.id };

  Bloque_hora.forge(conditions).fetch()
    .then(function(bloque_hora){
      if(!bloque_hora) return res.status(404).json({ error : true, data : { message : 'bloque de hora no existe' } });

       bloque_hora.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'bloque de hora actualizado'} });
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

  Bloque_hora.forge(conditions).fetch()
    .then(function(bloque_hora){
      if(!bloque_hora) return res.status(404).json({ error : true, data : { message : 'bloque de hora no existe' } });
      bloque_hora.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del bloque de hora actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteBloque_hora = (req,res) => {

  let conditions = { id: req.params.id };

  Bloque_hora.forge(conditions).fetch()
    .then(function(bloque_hora){
      if(!bloque_hora) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      bloque_hora.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'valoracion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.borrarBloque_hora = (req,res) => {

  let conditions = { id: req.params.id };

  Bloque_hora.forge(conditions).fetch()
    .then(function(bloque_hora){
      if(!bloque_hora) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      bloque_hora.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'valoracion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}