//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Documento = require('../models/documento');

exports.findDocumentos = (req,res) => {
  
  Documento.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocumento = (req,res) => {

  let newData = {
    tipo_documento_id:        req.body.tipo_documento_id,
    nombre:                   req.body.nombre,
    estatus:                  'A',
  }

  
  Documento.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'documento creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocumento = (req,res) => {

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

exports.updateDocumento = (req,res) => {

  let conditions = { id: req.params.id };

  Documento.forge(conditions).fetch()
    .then(function(documento){
      if(!documento) return res.status(404).json({ error : true, data : { message : 'documento no existe' } });
      
      documento.save(req.body)
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

  Documento.forge(conditions).fetch()
    .then(function(documento){
      if(!documento) return res.status(404).json({ error : true, data : { message : 'documento no existe' } });
      documento.save({estatus:req.body.estatus})
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


exports.deleteDocumento = (req,res) => {

  let conditions = { id: req.params.id };

  Documento.forge(conditions).fetch()
    .then(function(documento){
      if(!documento) return res.status(404).json({ error : true, data : { message : 'documento no existe' } });

      documento.save({estatus:'I'})
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
