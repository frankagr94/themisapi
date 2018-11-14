//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Empleado = require('../models/empleado');
const Usuario = require('./models/usuario');
const fs = require("fs");

exports.findDocuments = (req,res) => {
  
  Empleado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  /* ----- Extension Imagen -----
  if(req.files.archivo) {
    var extension = req.files.archivo.name.split(".").pop();
  }else{
    var extension = null;
  }*/

  Usuario.where({correo: req.body.correo}).fetch()
    .then(function(usuario){
      if(usuario){
        res.status(404).send({ error: true, data: {message: "Ya existe un usuario con ese correo"} })
      }
      else{
        let newUser = {
          correo:           req.body.correo,
          contrasenia:      req.body.contrasenia,
          rol_id:           req.body.rol_id,
          ultimo_acceso:    req.body.ultimo_acceso
        }

        Usuario.forge(newUser).save()
        .then(function(usuario){
          let newData = {
            nombre1:          req.body.nombre,
            nombre2:          req.body.nombre2,
            apellido:         req.body.apellido,
            apellido2:        req.body.apellido2,
            cedula:           req.body.cedula,
            sexo:             req.body.sexo,
            fecha_nac:        req.body.fecha_nac,
            estatus:          'A',
            usuario_id:       usuario.id,
            pais_id:          req.body.pais_id,
            estado_id:        req.body.estado_id,
            estado_civil_id:  req.body.estado_civil_id,
            sexo:             req.body.sexo,
            empresa_id:       req.body.empresa_id,
            tipo_empleado_id: req.body.tipo_empleado_id,
          }
        
          Empleado.forge(newData).save()
          .then(function(data){
            // ----- Guardar Imagen -----
            //if(req.files.archivo) fs.rename(req.files.archivo.path, "files/empleado/"+data.id+"."+extension);
            
            res.status(200).json({ error: false, data: { message: 'empleado creado' } });
          })
          .catch(function (err) {
            res.status(500).json({ error: true, data: {message: err.message} });
          });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err2.message} });
        });
      }
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err2.message} });
    });
}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'empleado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado.forge(conditions).fetch()
    .then(function(empleado){
      if(!empleado) return res.status(404).json({ error : true, data : { message : 'empleado no existe' } });

      // ----- Extension Imagen -----
      if(req.files.archivo) {
        var extension = req.files.archivo.name.split(".").pop();
      }

      let newData = {
        nombre1:          req.body.nombre,
        nombre2:          req.body.nombre2,
        apellido:         req.body.apellido,
        apellido2:        req.body.apellido2,
        cedula:           req.body.cedula,
        sexo:             req.body.sexo,
        fecha_nac:        req.body.fecha_nac,
        estatus:          req.body.estatus,
        usuario_id:       req.body.usuario_id,
        pais_id:          req.body.pais_id,
        estado_id:        req.body.estado_id,
        estado_civil_id:  req.body.estado_civil_id,
        sexo:             req.body.sexo,
        empresa_id:       req.body.empresa_id,
        tipo_empleado_id: req.body.tipo_empleado_id,
      }
      
      empleado.save(updateData)
        .then(function(data){
          // ----- Guardar Imagen -----
          if(req.files.archivo) fs.rename(req.files.archivo.path, "files/empleado/"+data.id+"."+extension);

          res.status(200).json({ error : false, data : { message : 'empleado actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.visible = (req, res)=>{
  let conditions = { id:req.params.id};

  Empleado.forge(conditions).fetch()
    .then(function(empleado){
      if(!empleado) return res.status(404).json({ error : true, data : { message : 'empleado no existe' } });

      let visible = req.body.visible;
      empleado.save({visible:visible})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'empleado visible'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
        });
    });
}

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado.forge(conditions).fetch()
    .then(function(empleado){
      if(!empleado) return res.status(404).json({ error : true, data : { message : 'empleado no existe' } });

      empleado.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'empleado eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}