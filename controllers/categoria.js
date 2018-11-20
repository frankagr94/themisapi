//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Categoria = require('../models/categoria');
const mw = require('../middlewares/uploader');

exports.findDocuments = (req,res) => {
  
  Categoria.forge().fetchAll({
    withRelated: [
      'catalogo_servicio'
    ]
  })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:                req.body.nombre,
    descripcion:           req.body.descripcion,
    imagen:                '',
    estatus:               req.body.estatus,
    especialidad_id:       req.body.especialidad_id
  }
  console.log(req);
  if(!req.files.imagen){
      res.status(404).json({ error: true, data: { message: 'Debe seleccionar una imagen para la categoria' } });
  }
  else{
    mw.uploader('imagen/',req.files.imagen).then(function(result) {
      if(result.error){
        console.log('Error al subir imagen')
        return res.status(500).send({ message : 'hubo un error' })
      }else{
        newData.imagen = result.url;
        Categoria.forge(newData).save()
        .then(function(data){
          console.log('Se guardo con imagen '+newData.imagen)
          res.status(200).json({ error: false, data: { message: 'categoria creado' } });
        })
        .catch(function (err) {
          res.status(500).json({ error: true, data: {message: err.message} });
        });
      }
    })
  }
}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'categoria no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria.forge(conditions).fetch()
    .then(function(categoria){
      if(!categoria) return res.status(404).json({ error : true, data : { message : 'categoria no existe' } });

      let updateData = {
        nombre:                req.body.nombre,
        descripcion:           req.body.descripcion,
        imagen:                req.body.imagen,
        estatus:               req.body.estatus,
        especialidad_id:       req.body.especialidad_id
      }
      
      categoria.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'categoria actualizado'} });
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

  Categoria.forge(conditions).fetch()
    .then(function(categoria){
      if(!categoria) return res.status(404).json({ error : true, data : { message : 'categoria no existe' } });

      categoria.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'categoria eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}