//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Empresa = require('../models/empresa');
const fs = require("fs");

exports.findDocuments = (req,res) => {
  
  Empresa.forge().fetchAll()
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
    rif:                  req.body.rif,
    nombre:               req.body.nombre,
    hora_inicio_trabajo:  req.body.hora_inicio_trabajo,
    hora_fin_trabajo:     req.body.hora_fin_trabajo,
    imagen:               extension,
    estatus:              req.body.estatus,
    id_sistema:           req.body.id_sistema,
    fecha_creacion:       req.body.fecha_creacion,
  }

  Empresa.forge(newData).save()
  .then(function(data){
    // ----- Guardar Imagen -----
    if(req.files.archivo) fs.rename(req.files.archivo.path, "files/empresa/"+data.id+"."+extension);

    res.status(200).json({ error: false, data: { message: 'empresa creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empresa.forge(conditions).fetch({
    withRelated: [
      'empleados',
      'objetivos'
    ]
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'empresa no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empresa.forge(conditions).fetch()
    .then(function(empresa){
      if(!empresa) return res.status(404).json({ error : true, data : { message : 'empresa no existe' } });

      // ----- Extension Imagen -----
      if(req.files.archivo) {
        var extension = req.files.archivo.name.split(".").pop();
      }

      let updateData = {
        rif:                  req.body.rif,
        nombre:               req.body.nombre,
        direccion:            req.body.direccion,
        correo:               req.body.correo,
        telefono1:            req.body.telefono1,
        telefono2:            req.body.telefono2,
      }

      
      empresa.save(updateData)
        .then(function(data){
          // ----- Guardar Imagen -----
          if(req.files.archivo) fs.rename(req.files.archivo.path, "files/empresa/"+data.id+"."+extension);
          
          res.status(200).json({ error : false, data : { message : 'empresa actualizado'} });
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

  Empresa.forge(conditions).fetch()
    .then(function(empresa){
      if(!empresa) return res.status(404).json({ error : true, data : { message : 'empresa no existe' } });

      Empresa.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'empresa eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}