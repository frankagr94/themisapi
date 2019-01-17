//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Valoracion_catalogo = require('../models/valoracion_catalogo');

exports.findDocuments = (req,res) => {
  
  Valoracion_catalogo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    tipo_valoracion_id:        req.body.tipo_valoracion_id,
    catalogo_servicio_id:      req.body.catalogo_servicio_id
  }

  Valoracion_catalogo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'valoracion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Valoracion_catalogo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneDocumentByCatalogo = (req,res) => {

  let conditions = { catalogo_servicio_id: req.params.catalogo_servicio_id };

  Valoracion_catalogo.where(conditions).fetchAll()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Valoracion_catalogo.forge(conditions).fetch()
    .then(function(valoracion_catalogo){
      if(!valoracion_catalogo) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      valoracion_catalogo.save(req.body)
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

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Valoracion_catalogo.forge(conditions).fetch()
    .then(function(valoracion_catalogo){
      if(!valoracion_catalogo) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      valoracion_catalogo.destroy()
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