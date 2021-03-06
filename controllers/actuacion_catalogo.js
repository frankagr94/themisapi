//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Actuacion_catalogo = require('../models/actuacion_catalogo');

exports.findActuacion_catalogos = (req,res) => {
  
  Actuacion_catalogo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createActuacion_catalogo = (req,res) => {

  let newData = {
    actuacion_id:           req.body.actuacion_id,
    catalogo_servicio_id:   req.body.catalogo_servicio_id,
    orden:                  req.body.orden
  }

  Actuacion_catalogo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'actuacion_catalogo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneActuacion_catalogo = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion_catalogo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'actuacion_catalogo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateActuacion_catalogo = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion_catalogo.forge(conditions).fetch()
    .then(function(actuacion_catalogo){
      if(!actuacion_catalogo) return res.status(404).json({ error : true, data : { message : 'actuacion_catalogo no existe' } });

      actuacion_catalogo.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'actuacion_catalogo actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteActuacion_catalogo = (req,res) => {

  let conditions = { id: req.params.id };

  Actuacion_catalogo.forge(conditions).fetch()
    .then(function(actuacion_catalogo){
      if(!actuacion_catalogo) return res.status(404).json({ error : true, data : { message : 'actuacion_catalogo no existe' } });

      actuacion_catalogo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'actuacion_catalogo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}