//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Red_social = require('../models/red_social');

exports.findRed_socials = (req,res) => {
  
  Red_social.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createRed_social = (req,res) => {

  let newData = {
    nombre:    		      req.body.nombre,
    estatus:            'A',  }

  Red_social.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'red_social creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneRed_social = (req,res) => {

  let conditions = { id: req.params.id };

  Red_social.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'red_social no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateRed_social = (req,res) => {

  let conditions = { id: req.params.id };

  Red_social.forge(conditions).fetch()
    .then(function(red_social){
      if(!red_social) return res.status(404).json({ error : true, data : { message : 'red_social no existe' } });

      red_social.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'red_social actualizado'} });
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

  Red_social.forge(conditions).fetch()
    .then(function(red_social){
      if(!red_social) return res.status(404).json({ error : true, data : { message : 'red_social no existe' } });
      red_social.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus de la red_social actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteRed_social = (req,res) => {

  let conditions = { id: req.params.id };

  Red_social.forge(conditions).fetch()
    .then(function(red_social){
      if(!red_social) return res.status(404).json({ error : true, data : { message : 'red_social no existe' } });

      red_social.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'red_social eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}