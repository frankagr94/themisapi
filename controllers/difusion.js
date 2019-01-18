//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Difusion = require('../models/difusion');

exports.findDocuments = (req,res) => {
  
  Difusion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    promocion_id:            req.body.promocion_id,
    caracteristica_id:       req.body.caracteristica_id
  }

  difusion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'difusion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Difusion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'difusion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Difusion.forge(conditions).fetch()
    .then(function(difusion){
      if(!difusion) return res.status(404).json({ error : true, data : { message : 'difusion no existe' } });

      difusion.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'difusion actualizado'} });
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

  Difusion.forge(conditions).fetch()
    .then(function(difusion){
      if(!difusion) return res.status(404).json({ error : true, data : { message : 'difusion no existe' } });

      difusion.destroy()
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