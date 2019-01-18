//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Promocion = require('../models/promocion');
const mw = require('../middlewares/uploader');

exports.findDocuments = (req,res) => {
  
  Promocion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    catalogo_servicio_id:          req.body.catalogo_servicio_id,
    nombre:               req.body.nombre,
    descripcion:          req.body.descripcion,
    imagen:               '',
    fecha_inicio:         req.body.fecha_inicio,
    fecha_fin:            req.body.fecha_fin,
    estatus:              'A',
  }

  if(!req.files){
    res.status(404).json({ error: true, data: { message: 'Debe seleccionar una imagen para la categoria' } });
  }
  else{
    mw.uploader(req.files.imagen).then(function(result) {
      if(result.error){
        return res.status(500).send({ message : 'hubo un error subiendo la imagen' })
      }else{
        newData.imagen = result.url;
        Promocion.forge(newData).save()
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'promocion creado' } });
        })
        .catch(function (err) {
          res.status(500).json({ error: true, data: {message: err.message} });
        });
      }
    });
  }

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Promocion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'promocion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Promocion.forge(conditions).fetch()
    .then(function(promocion){
      if(!promocion) return res.status(404).json({ error : true, data : { message : 'promocion no existe' } });
      
      if(!req.files){
        promocion.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'promocion actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })
      }
      else{
        mw.uploader(req.files.imagen).then(function(result) {
          if(result.error){
            console.log('Error al subir imagen')
            return res.status(500).send({ message : 'hubo un error subiendo la imagen' })
          }
          else{
            let newData = req.body
            newData.imagen = result.url
            promocion.save(req.body)
            .then(function(data){
              res.status(200).json({ error : false, data : { message : 'promocion actualizado'} });
            })
            .catch(function(err){
              res.status(500).json({ error : false, data : {message : err.message} });
            })
          }
        });
      }
    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Promocion.forge(conditions).fetch()
    .then(function(promocion){
      if(!promocion) return res.status(404).json({ error : true, data : { message : 'promocion no existe' } });

      promocion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'promocion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}