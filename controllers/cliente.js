//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Cliente = require('../models/cliente');
const Usuario = require('../models/usuario');

exports.findClientes = (req,res) => {
  
  Cliente.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createCliente = (req,res) => {

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

exports.findOneCliente = (req,res) => {

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

exports.findOneClientUser = (req,res) => {

  let conditions = { id: req.params.id };

  Cliente.forge(conditions).fetch()
    .then(function(cliente){
      if(!cliente) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });
      Usuario.forge({id:cliente.usuario_id}).fetch()
        .then(function(data){
          res.status(200).json({ error : false, data : data.toJSON() })
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
        })
    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateCliente = (req,res) => {

  let conditions = { id: req.params.id };

  Cliente.forge(conditions).fetch()
    .then(function(cliente){
      if(!cliente) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });

      cliente.save(req.body)
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


exports.deleteCliente = (req,res) => {

  let conditions = { id: req.params.id };

  Cliente.forge(conditions).fetch()
    .then(function(cliente){
      if(!cliente) return res.status(404).json({ error : true, data : { message : 'cliente no existe' } });

      cliente.save({estatus:'I'})
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
