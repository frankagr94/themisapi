//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Documento = require('../models/documento');

exports.findDocuments = (req,res) => {
  
  Documento.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    tipo_documento_id:        req.body.id_tipo_documento,
    nombre:                   req.body.nombre,
    estatus:                  req.body.estatus,
  }

  
  Documento.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'documento creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Documento.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'documento no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Documento.forge(conditions).fetch()
    .then(function(documento){
      if(!documento) return res.status(404).json({ error : true, data : { message : 'documento no existe' } });

      let newData = {
        tipo_documento_id:        req.body.id_tipo_documento,
        nombre:                   req.body.nombre,
        estatus:                  req.body.estatus,
      }
      
      Documento.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'documento actualizado'} });
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

  Actuacion.forge(conditions).fetch()
    .then(function(actuacion){
      if(!actuacion) return res.status(404).json({ error : true, data : { message : 'documento no existe' } });
      actuacion.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del documento actualizado'} });
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

  Documento.forge(conditions).fetch()
    .then(function(documento){
      if(!documento) return res.status(404).json({ error : true, data : { message : 'documento no existe' } });

      documento.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'documento eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}