//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Perfil_caracteristica = require('../models/perfil_caracteristica');

exports.findDocuments = (req,res) => {
  
  Perfil_caracteristica.forge().fetchAll()
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
    estatus: 	          req.body.estatus
  }

  Perfil_caracteristica.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'perfil_caracteristica creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Perfil_caracteristica.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'perfil_caracteristica no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Perfil_caracteristica.forge(conditions).fetch()
    .then(function(perfil_caracteristica){
      if(!perfil_caracteristica) return res.status(404).json({ error : true, data : { message : 'perfil_caracteristica no existe' } });

      let updateData = {
        caracteristica_id:  req.body.caracteristica_id,
        cliente_id:    		  req.body.cliente_id,
        estatus: 	          req.body.estatus
      }
      
      perfil_caracteristica.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'perfil_caracteristica actualizado'} });
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

  Perfil_caracteristica.forge(conditions).fetch()
    .then(function(perfil_caracteristica){
      if(!perfil_caracteristica) return res.status(404).json({ error : true, data : { message : 'perfil_caracteristica no existe' } });

      perfil_caracteristica.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'perfil_caracteristica eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}