//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_valoracion_rango_valoracion = require('../models/tipo_valoracion_rango_valoracion');

exports.findValoracion_rangos = (req,res) => {
  
  Tipo_valoracion_rango_valoracion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createValoracion_rango = (req,res) => {

  let newData = {
    tipo_valoracion_id:        req.body.tipo_valoracion_id,
    rango_valoracion_id:       req.body.rango_valoracion_id,
    catalogo_servicio_id:      req.body.catalogo_servicio_id

  }

  Tipo_valoracion_rango_valoracion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'valoracion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneValoracion_rango = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_valoracion_rango_valoracion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneValoracion_rangoByCatalogo = (req,res) => {

  let conditions = { catalogo_servicio_id: req.params.catalogo_servicio_id };

  Tipo_valoracion_rango_valoracion.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateValoracion_rango = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_valoracion_rango_valoracion.forge(conditions).fetch()
    .then(function(tipo_valoracion_rango_valoracion){
      if(!tipo_valoracion_rango_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      let updateData = {
        id_tipo:        req.body.id_tipo,
        id_rango:       req.body.id_rango
      }
      
      tipo_valoracion_rango_valoracion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'valoracion actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteValoracion_rango = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_valoracion_rango_valoracion.forge(conditions).fetch()
    .then(function(tipo_valoracion_rango_valoracion){
      if(!tipo_valoracion_rango_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      tipo_valoracion_rango_valoracion.destroy()
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