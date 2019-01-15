//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Recaudo_catalogo = require('../models/recaudo_catalogo');

exports.findDocuments = (req,res) => {
  
  Recaudo_catalogo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    catalogo_servicio_id: req.body.catalogo_servicio_id,
    documento_id:        req.body.documento_id
  }

  Recaudo_catalogo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'recaudo_catalogo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Recaudo_catalogo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'recaudo_catalogo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Recaudo_catalogo.forge(conditions).fetch()
    .then(function(recaudo_catalogo){
      if(!recaudo_catalogo) return res.status(404).json({ error : true, data : { message : 'recaudo_catalogo no existe' } });

      recaudo_catalogo.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'recaudo_catalogo actualizado'} });
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

  Recaudo_catalogo.forge(conditions).fetch()
    .then(function(recaudo_catalogo){
      if(!recaudo_catalogo) return res.status(404).json({ error : true, data : { message : 'recaudo_catalogo no existe' } });

      recaudo_catalogo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'recaudo_catalogo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}