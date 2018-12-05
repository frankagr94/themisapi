//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Usuario = require('../models/usuario');
const util = require('../middlewares/utils');
const mw = require('../middlewares/uploader');

exports.findUsuarios = (req,res) => {
  
  Usuario.where({estatus:'A'||'a'}).fetchAll({
    withRelated:[
      'rol',
      'rol.funciones',
      'rol.funciones.ruta'
    ]
  })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createUsuario = (req,res) => {

  //encriptado de contraseña
  let salt = bcrypt.genSaltSync(12);
  let hash = bcrypt.hashSync(req.body.contrasenia, salt);

  let newData = {
    rol_id:         '1',
    correo:         req.body.correo,
    contrasenia:    hash,
    fecha_creacion: util.fecha(),
    estatus:        req.body.estatus,
    imagen:         'https://res.cloudinary.com/digitalmarket/image/upload/v1528924814/sin_imagen.jpg'
  }

  Usuario.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'usuario creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneUsuario = (req,res) => {

  let conditions = { correo: req.params.correo };

  Usuario.forge(conditions).fetch({
    withRelated : [
      'rol',
      'rol.funciones',
      'rol.funciones.ruta'
    ]
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'usuario no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateUsuario = (req,res) => {

  let conditions = { id: req.params.id };

    Usuario.forge(conditions).fetch()
    .then(function(usuario){
      if(!usuario) return res.status(404).json({ error : true, data : { message : 'usuario no existe' } });

      if (req.body.contrasenia === null || req.body.contrasenia === undefined) {
        req.body.contrasenia = usuario.contrasenia;
      }else{
        //encriptado de contraseña
        let salt = bcrypt.genSaltSync(12);
        let hash = bcrypt.hashSync(req.body.contrasenia, salt);
        req.body.contrasenia = hash;
      }
      
      if(!req.files){
        usuario.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'usuario actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })
      }else {
        mw.uploader(req.files.imagen).then(function(result) {
          if(result.error){
            console.log('Error al subir imagen')
            return res.status(500).send({ message : 'hubo un error' })
          }
          else{
            let newData = req.body
            newData.imagen = result.url
            usuario.save(newData)
            .then(function(data){
              res.status(200).json({ error : false, data : { message : 'usuario actualizado'} });
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

exports.cambiarEstatus = (req,res) => {

  let conditions = { id: req.params.id };

  Usuario.forge(conditions).fetch()
    .then(function(usuario){
      if(!usuario) return res.status(404).json({ error : true, data : { message : 'usuario no existe' } });
      usuario.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del usuario actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}


exports.deleteUsuario = (req,res) => {

  let conditions = { id: req.params.id };

  Usuario.forge(conditions).fetch()
    .then(function(usuario){
      if(!usuario) return res.status(404).json({ error : true, data : { message : 'usuario no existe' } });

      usuario.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'usuario eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}