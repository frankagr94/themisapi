//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Abogado_servicio = require('../models/abogado_servicio');

exports.findDocuments = (req,res) => {
  
  Abogado_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    abogado_id:              req.body.abogado_id,
    servicio_id:             req.body.servicio_id,
  }

  Abogado_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'abogado_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Abogado_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'abogado_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Abogado_servicio.forge(conditions).fetch()
    .then(function(abogado_servicio){
      if(!abogado_servicio) return res.status(404).json({ error : true, data : { message : 'abogado_servicio no existe' } });

      abogado_servicio.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'abogado_servicio actualizado'} });
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

  Abogado_servicio.forge(conditions).fetch()
    .then(function(abogado_servicio){
      if(!abogado_servicio) return res.status(404).json({ error : true, data : { message : 'abogado_servicio no existe' } });

      abogado_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'abogado_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}