//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Imagen_carrusel = require('../models/imagen_carrusel');

exports.findImagen_carrusels = (req,res) => {
  
  Imagen_carrusel.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createImagen_carrusel = (req,res) => {

  let newData = {
    imagen:      req.body.imagen,
    texto:       req.body.texto,
    inicio_web_id:           req.body.inicio_web_id 
  }

  Imagen_carrusel.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'imagen_carrusel creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneImagen_carrusel = (req,res) => {

  let conditions = { id: req.params.id };

  imagen_carrusel.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'imagen_carrusel no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateImagen_carrusel = (req,res) => {

  let conditions = { id: req.params.id };

  imagen_carrusel.forge(conditions).fetch()
    .then(function(imagen_carrusel){
      if(!imagen_carrusel) return res.status(404).json({ error : true, data : { message : 'imagen_carrusel no existe' } });

      let updateData = {
        imagen:      req.body.imagen,
        texto:       req.body.texto,
        inicio_web_id:           req.body.inicio_web_id
      }
      
      imagen_carrusel.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'imagen_carrusel actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteImagen_carrusel = (req,res) => {

  let conditions = { id: req.params.id };

  imagen_carrusel.forge(conditions).fetch()
    .then(function(imagen_carrusel){
      if(!imagen_carrusel) return res.status(404).json({ error : true, data : { message : 'imagen_carrusel no existe' } });

      imagen_carrusel.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'imagen_carrusel eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}