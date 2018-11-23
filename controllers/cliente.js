//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Cliente = require('../models/cliente');

exports.findDocuments = (req,res) => {
  
  Cliente.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    apellido:           req.body.apellido,
    cedula:             req.body.cedula,
    telefono:           req.body.telefono,
    direccion:          req.body.direccion,
    fecha_nacimiento:   req.body.fecha_nacimiento,
    tipo_cliente_id:    req.body.tipo_cliente_id,
    estatus:            req.body.estatus,
    usuario_id:         req.body.usuario_id,
  }

  Cliente.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'cliente creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Cliente.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.findOneClientByUser = (req,res) => {

  let conditions = { usuario_id: req.params.id_usuario };

  Cliente.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Cliente.forge(conditions).fetch()
    .then(function(cliente){
      if(!cliente) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });

      let updateData = {
        nombre1:          req.body.nombre,
        nombre2:          req.body.nombre2,
        apellido:         req.body.apellido,
        apellido2:        req.body.apellido2,
        cedula:           req.body.cedula,
        direccion:        req.body.direccion,
        sexo:             req.body.sexo,
        fecha_nac:        req.body.fecha_nac,
        estatus:          req.body.estatus,
        usuario_id:       req.body.usuario_id,
        pais_id:          req.body.pais_id,
        estado_id:        req.body.estado_id,
        estado_civil_id:  req.body.estado_civil_id,
        sexo:             req.body.sexo,
        empresa_id:       req.body.empresa_id,
        tipo_cliente_id:  req.body.tipo_cliente_id,
      }
      
      cliente.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'cliente actualizado'} });
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

  Cliente.forge(conditions).fetch()
    .then(function(cliente){
      if(!cliente) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });
      cliente.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del cliente actualizado'} });
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

  Cliente.forge(conditions).fetch()
    .then(function(cliente){
      if(!cliente) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });

      cliente.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'cliente eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}
