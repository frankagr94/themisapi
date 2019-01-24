//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Caracteristica = require('../models/caracteristica');

exports.findCaracteristicas = (req,res) => {
  
  Caracteristica.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createCaracteristica = (req,res) => {

  let newData = {
    nombre:          req.body.nombre,
    descripcion:     req.body.descripcion,
    caracteristica_base_id:    req.body.caracteristica_base_id,
    estatus:         'A'
  }

  Caracteristica.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'caracteristica creada' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneCaracteristica = (req,res) => {

  let conditions = { id: req.params.id };

  Caracteristica.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'caracteristica no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneCaracteristicaByBase = (req,res) => {

  let conditions = { caracteristica_base_id: req.params.caracteristica_base_id };

  Caracteristica.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'caracteristica no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateCaracteristica = (req,res) => {

  let conditions = { id: req.params.id };

  Caracteristica.forge(conditions).fetch()
    .then(function(caracteristica){
      if(!caracteristica) return res.status(404).json({ error : true, data : { message : 'caracteristica no existe' } });

      caracteristica.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'caracteristica actualizada'} });
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

  Caracteristica.forge(conditions).fetch()
    .then(function(caracteristica){
      if(!caracteristica) return res.status(404).json({ error : true, data : { message : ' caracteristica no existe' } });
      caracteristica.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del tipo de la caractertica actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteCaracteristica = (req,res) => {

  let conditions = { id: req.params.id };

  Caracteristica.forge(conditions).fetch()
    .then(function(caracteristica){
      if(!caracteristica) return res.status(404).json({ error : true, data : { message : 'caracteristica no existe' } });

      caracteristica.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'caracteristica eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.borrarCaracteristica = (req,res) => {

  let conditions = { id: req.params.id };

  Caracteristica.forge(conditions).fetch()
    .then(function(caracteristica){
      if(!caracteristica) return res.status(404).json({ error : true, data : { message : 'caracteristica no existe' } });

      caracteristica.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'caracteristica eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}