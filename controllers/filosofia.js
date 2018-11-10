//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const filosofia = require('../models/filosofia');

exports.findDocuments = (req,res) => {
  
  Filosofia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    titulo:      req.body.titulo,
    texto:       req.body.texto,
    mision:      req.body.mision,
    vision:      req.body.vision,
    valor1:      req.body.valor1,
    valor2:      req.body.valor2,
    valor3:      req.body.valor3,
    empresa_id:  req.body.empresa_id 
  }

  Filosofia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'filosofia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Filosofia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'filosofia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Filosofia.forge(conditions).fetch()
    .then(function(filosofia){
      if(!filosofia) return res.status(404).json({ error : true, data : { message : 'filosofia no existe' } });

      let updateData = {
        titulo:      req.body.titulo,
        texto:       req.body.texto,
        mision:      req.body.mision,
        vision:      req.body.vision,
        valor1:      req.body.valor1,
        valor2:      req.body.valor2,
        valor3:      req.body.valor3 
    }
      
      filosofia.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'filosofia actualizado'} });
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

  Filosofia.forge(conditions).fetch()
    .then(function(filosofia){
      if(!filosofia) return res.status(404).json({ error : true, data : { message : 'filosofia no existe' } });

      filosofia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'filosofia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}