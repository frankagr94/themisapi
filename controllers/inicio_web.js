//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Inicio_web = require('../models/inicio_web');

exports.findInicios = (req,res) => {
  
  Inicio_web.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createInicio = (req,res) => {

  let newData = {
    titulo_nosotros:      req.body.titulo_nosotros,
    texto1_nosotros:      req.body.texto1_nosotros,
    texto2_nosotros:      req.body.texto2_nosotros,
    imagen_nosotros:      req.body.imagen_nosotros,
    titulo_equipo:        req.body.titulo_equipo,
    titulo_app:           req.body.titulo_app,
    imagen_app:           req.body.imagen_app,
    texto_app:            req.body.texto_app,
    empresa_id:           req.body.empresa_id 
  }

  Inicio_web.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'inicio_web creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneInicio = (req,res) => {

  let conditions = { id: req.params.id };

  Inicio_web.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'inicio_web no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateInicio = (req,res) => {

  let conditions = { id: req.params.id };

  Inicio_web.forge(conditions).fetch()
    .then(function(inicio_web){
      if(!inicio_web) return res.status(404).json({ error : true, data : { message : 'inicio_web no existe' } });

      inicio_web.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'inicio_web actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteInicio = (req,res) => {

  let conditions = { id: req.params.id };

  Inicio_web.forge(conditions).fetch()
    .then(function(inicio_web){
      if(!inicio_web) return res.status(404).json({ error : true, data : { message : 'inicio_web no existe' } });

      inicio_web.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'inicio_web eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}