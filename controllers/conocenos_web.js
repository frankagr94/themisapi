//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Conocenos_web = require('../models/conocenos_web');

exports.findPortals = (req,res) => {
  
  Conocenos_web.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createPortal = (req,res) => {

  let newData = {
    titulo:      req.body.titulo,
    texto:       req.body.texto,
    empresa_id:  req.body.empresa_id 
  }

  Conocenos_web.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'conocenos_web creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOnePortal = (req,res) => {

  let conditions = { id: req.params.id };

  Conocenos_web.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'conocenos_web no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updatePortal = (req,res) => {

  let conditions = { id: req.params.id };

  Conocenos_web.forge(conditions).fetch()
    .then(function(conocenos_web){
      if(!conocenos_web) return res.status(404).json({ error : true, data : { message : 'conocenos_web no existe' } });
 
      conocenos_web.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'conocenos_web actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deletePortal = (req,res) => {

  let conditions = { id: req.params.id };

  conocenos_web.forge(conditions).fetch()
    .then(function(conocenos_web){
      if(!conocenos_web) return res.status(404).json({ error : true, data : { message : 'conocenos_web no existe' } });

      conocenos_web.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'conocenos_web eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}