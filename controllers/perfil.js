//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Perfil = require('../models/perfil');

exports.findDocuments = (req,res) => {
  
  Perfil.where({estatus:'A'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    caracteristica_id:  req.body.caracteristica_id,
    cliente_id:    		  req.body.cliente_id,
    estatus: 	          'A'
  }

  Perfil.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'perfil creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Perfil.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'perfil no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByClienteId = (req,res) => {

  let conditions = { cliente_id: req.params.cliente_id };

  Perfil.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'perfil no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Perfil.forge(conditions).fetch()
    .then(function(perfil){
      if(!perfil) return res.status(404).json({ error : true, data : { message : 'perfil no existe' } });

      perfil.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'perfil actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Perfil.forge(conditions).fetch()
    .then(function(perfil){
      if(!perfil) return res.status(404).json({ error : true, data : { message : 'perfil no existe' } });

      perfil.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'perfil eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}