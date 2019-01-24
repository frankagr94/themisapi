//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Rango_valoracion = require('../models/rango_valoracion');
const mw = require('../middlewares/uploader');

exports.findRango_valoracions = (req,res) => {
  
  Rango_valoracion.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createRango_valoracion = (req,res) => {

  let newData = {
    valor:           req.body.valor,
    imagen:          '',
    descripcion:     req.body.descripcion,
    estatus:         'A'
  }
      
            Rango_valoracion.forge(newData).save()
            .then(function(data){
              res.status(200).json({ error: false, data: { message: 'rango_valoracion creado con exito' } });
            })
            .catch(function (err) {
              res.status(500).json({ error: true, data: {message: err.message} });
            });
      
    
  
}

exports.findOneRango_valoracion = (req,res) => {

  let conditions = { id: req.params.id };

  Rango_valoracion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateRango_valoracion = (req,res) => {

  let conditions = { id: req.params.id };

  Rango_valoracion.forge(conditions).fetch()
    .then(function(rango_valoracion){
      if(!rango_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      if(!req.files){
        rango_valoracion.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'valoracion actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })
      }
      else{
        mw.uploader(req.files.imagen).then(function(result) {
          if(result.error){
            console.log('Error al subir imagen')
            return res.status(500).send({ message : 'hubo un error' })
          }
          else{
            let newData = req.body
            newData.imagen = result.url
            rango_valoracion.save(newData)
            .then(function(data){
              res.status(200).json({ error : false, data : { message : 'valoracion actualizado'} });
            })
            .catch(function(err){
              res.status(500).json({ error : false, data : {message : err.message} });
            })
          }
        })
      }
    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteRango_valoracion = (req,res) => {

  let conditions = { id: req.params.id };

  Rango_valoracion.forge(conditions).fetch()
    .then(function(rango_valoracion){
      if(!rango_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      rango_valoracion.save({estatus:'I'})
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

exports.borrarRango_valoracion = (req,res) => {

  let conditions = { id: req.params.id };

  Rango_valoracion.forge(conditions).fetch()
    .then(function(rango_valoracion){
      if(!rango_valoracion) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      rango_valoracion.destroy()
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