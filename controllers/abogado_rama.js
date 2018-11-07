//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Abogado_rama = require('../models/abogado_rama');

exports.findDocuments = (req,res) => {
  
  Abogado_rama.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    empleado_codigo:              req.body.empleado_codigo,
    rama_id:                      req.body.rama_id,
  }

  Abogado_rama.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'abogado_rama creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Abogado_rama.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'abogado_rama no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Abogado_rama.forge(conditions).fetch()
    .then(function(abogado_rama){
      if(!abogado_rama) return res.status(404).json({ error : true, data : { message : 'abogado_rama no existe' } });

      let updateData = {
        empleado_codigo:              req.body.empleado_codigo,
        rama_id:                      req.body.rama_id,
      }
      
      abogado_rama.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'abogado_rama actualizado'} });
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

  Abogado_rama.forge(conditions).fetch()
    .then(function(abogado_rama){
      if(!abogado_rama) return res.status(404).json({ error : true, data : { message : 'abogado_rama no existe' } });

      abogado_rama.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'abogado_rama eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}