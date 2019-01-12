//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Empleado = require('../models/empleado');
const Usuario = require('../models/usuario');
const util = require('../middlewares/utils');
const generator = require('password-generator');
const mailer = require('../services/mailer');

exports.findEmpleados = (req,res) => {
  
  Empleado.where({estatus:'A'||'A'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createEmpleado = (req,res) => {
      let pass = generator(12, false);
			//---- encriptado de contraseña
			let salt = bcrypt.genSaltSync(12);
			let hash = bcrypt.hashSync(pass, salt);

  Usuario.where({correo: req.body.correo}).fetch()
    .then(function(usuario){
      if(usuario){
        res.status(404).send({ error: true, data: {message: "Ya existe un usuario con ese correo"} })
      }
      else{
        let newUser = {
          correo:           req.body.correo,
          contrasenia:      hash,
          rol_id:           req.body.rol_id,
          ultimo_acceso:    '',
          imagen:         'https://res.cloudinary.com/digitalmarket/image/upload/v1528924814/sin_imagen.jpg'
        }

        Usuario.forge(newUser).save()
        .then(function(usuario){
          let newData = {
            nombre1:          req.body.nombre1,
            nombre2:          req.body.nombre2,
            apellido1:        req.body.apellido1,
            apellido2:        req.body.apellido2,
            correo:           req.body.correo,
            cedula:           req.body.cedula,
            direccion:        req.body.direccion,
            sexo:             req.body.sexo,
            fecha_nac:        req.body.fecha_nac,
            estatus:          'A',
            usuario_id:       usuario.id,
            pais_id:          req.body.pais_id,
            estado_id:        req.body.estado_id,
            ciudad:           req.body.ciudad,
            empresa_id:       req.body.empresa_id,
            tipo_empleado_id: req.body.tipo_empleado_id,
            especialidad_id:  req.body.especialidad_id,
            telefono:         req.body.telefono,
            estado_civil_id:  req.body.estado_civil_id,
            visible:          true
          }
        
          Empleado.forge(newData).save()
          .then(function(data){
            //--- Enviar Correo ---
            let asunto = 'Bienvenido a AC Abogados Corporativos - Datos de Acceso'
            let mensaje = 'Gracias por unirte '+newData.nombre1+', tenemos un gran numero de abogados y servicios para ti, para acceder a ellos solo debes usar tu correo y la siguiente contraseña: '+pass;

            mailer.enviarCorreo(req.body.correo,mensaje, asunto);
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

exports.mostrarVisibles = (req, res)=> {
  Empleado.where({visible: true}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });
}

exports.hacerVisible = (req, res)=>{
  Empleado.forge({id: req.params.id}).fetch()
    .then(function(empleado){
      if(!empleado){
        res.status(404).send({ error: true, data: {message: `El empleado con id ${req.params.id} no existe`} })
      }
      empleado.save({visible:req.body.visible})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'empleado visible'} });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
}

exports.findOneEmpleado = (req,res) => {

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

exports.findOneEmpleadoByUserId = (req,res) => {

  let conditions = { usuario_id: req.params.usuario_id };

  Empleado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'empleado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.asociar = (req, res)=>{
  let conditions = { id: req.body.id_empleado};

  Empleado.forge(conditions).fetch()
    .then(function(empleado){
      empleado.servicios().attach(req.body.servicio_id)
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'Servicios asociados al empleado' } });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err.message} });
    })
}

exports.updateEmpleado = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado.forge(conditions).fetch()
    .then(function(empleado){
      if(!empleado) return res.status(404).json({ error : true, data : { message : 'empleado no existe' } });
      
      empleado.save(req.body)
        .then(function(data){
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

exports.cambiarEstatus = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado.forge(conditions).fetch()
    .then(function(empleado){
      if(!empleado) return res.status(404).json({ error : true, data : { message : 'empleado no existe' } });
      empleado.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del empleado actualizado'} });
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

exports.deleteEmpleado = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado.forge(conditions).fetch()
    .then(function(empleado){
      if(!empleado) return res.status(404).json({ error : true, data : { message : 'empleado no existe' } });

      empleado.save({estatus:'I'})
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