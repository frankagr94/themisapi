//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Categoria = require('../models/categoria');
const mw = require('../middlewares/uploader');

exports.findDocuments = (req,res) => {
  
  Categoria.where({estatus:'A'||'a'}).fetchAll({
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
    estatus:               'A',
    especialidad_id:       req.body.especialidad_id
  }
  if(!req.files){
      res.status(404).json({ error: true, data: { message: 'Debe seleccionar una imagen para la categoria' } });
  }
  else{
    mw.uploader(req.files.imagen).then(function(result) {
      if(result.error){
        return res.status(500).send({ message : 'hubo un error' })
      }else{
        newData.imagen = result.url;
        Categoria.forge(newData).save()
        .then(function(data){
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
  //Busca primero si la categoria existe, caso positivo sigue el curso, caso falso retorna 404
  Categoria.forge(conditions).fetch()
    .then(function(categoria){
      if(!categoria) return res.status(404).json({ error : true, data : { message : 'categoria no existe' } });

      /* let updateData = {
        nombre:                req.body.nombre,
        descripcion:           req.body.descripcion,
        imagen:                req.body.imagen,
        estatus:               req.body.estatus,
        especialidad_id:       req.body.especialidad_id
      } */
      //Verifica si en la peticion va adjuntada una imagen, en caso falso guarda lo que viene en el body,
      //en caso positivo sube la imagen y guarda los datos con la imagen en base de datos
      if(!req.files){
        categoria.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'categoria actualizado'} });
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
            categoria.save(newData)
            .then(function(data){
              res.status(200).json({ error : false, data : { message : 'categoria actualizado'} });
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

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria.forge(conditions).fetch()
    .then(function(categoria){
      if(!categoria) return res.status(404).json({ error : true, data : { message : 'categoria no existe' } });

      /* categoria.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'categoria eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
      }) */
      let cond = {estatus: 'I'}
      categoria.save(cond)
      .then(function(data){
        res.status(200).json({ error : false, data : { message : 'categoria eliminada logicamente'} });
      })
      .catch(function(err){
        res.status(500).json({ error : false, data : {message : err.message} });
      })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}