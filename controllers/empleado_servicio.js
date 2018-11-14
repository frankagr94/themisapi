//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Empleado_servicio = require('../models/empleado_servicio');

exports.findDocuments = (req,res) => {
  
  Empleado_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    empleado_id:        req.body.empleado_id,
    servicio_id:        req.body.servicio_id
  }

  Empleado_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'valoracion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado_servicio.forge(conditions).fetch()
    .then(function(empleado_servicio){
      if(!empleado_servicio) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      let updateData = {
        empleado_id:        req.body.empleado_id,
        servicio_id:        req.body.servicio_id
      }
      
      empleado_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'valoracion actualizado'} });
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

  Empleado_servicio.forge(conditions).fetch()
    .then(function(empleado_servicio){
      if(!empleado_servicio) return res.status(404).json({ error : true, data : { message : 'valoracion no existe' } });

      empleado_servicio.destroy()
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