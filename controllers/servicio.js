//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Servicio = require('../models/servicio');
const fs = require("fs");

exports.findDocuments = (req,res) => {
  
  Servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  // ----- Extension Imagen -----
  if(req.files.archivo) {
    var extension = req.files.archivo.name.split(".").pop();
  }else{
    var extension = null;
  }

  let newData = {
    cliente_id:         req.body.cliente_id, 
    catalogo_serv_id:   req.body.catalogo_serv_id,
    descripcion:        req.body.descripcion,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
    fecha_cierre:       req.body.fecha_cierre
  }

  Servicio.forge(newData).save()
  .then(function(data){
    // ----- Guardar Imagen -----
    if(req.files.archivo) fs.rename(req.files.archivo.path, "files/servicio/"+data.id+"."+extension);

    res.status(200).json({ error: false, data: { message: 'servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}



exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio.forge(conditions).fetch()
    .then(function(servicio){
      if(!servicio) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });

      // ----- Extension Imagen -----
      if(req.files.archivo) {
        var extension = req.files.archivo.name.split(".").pop();
      }

      let updateData = {
        cliente_id:         req.body.cliente_id, 
        catalogo_serv_id:   req.body.catalogo_serv_id,
        descripcion:        req.body.descripcion,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
        fecha_cierre:       req.body.fecha_cierre
      } 
      
      servicio.save(updateData)
        .then(function(data){
          // ----- Guardar Imagen -----
          if(req.files.archivo) fs.rename(req.files.archivo.path, "files/servicio/"+data.id+"."+extension);

          res.status(200).json({ error : false, data : { message : 'servicio actualizado'} });
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

  Servicio.forge(conditions).fetch()
    .then(function(servicio){
      if(!servicio) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });
      servicio.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del servicio actualizado'} });
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

  Servicio.forge(conditions).fetch()
    .then(function(servicio){
      if(!servicio) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });

      servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}