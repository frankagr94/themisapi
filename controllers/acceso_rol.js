//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Acceso_rol = require('../models/acceso_rol');

exports.findDocuments = (req,res) => {
  
  Acceso_rol.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    rol_id:             req.body.rol_id,
    funcion_id:         req.body.acceso_id,
    ver :               true,
    nombre_icono:       req.body.nombre_icono
  }

  Acceso_rol.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'acceso_rol creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Acceso_rol.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'acceso_rol no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Acceso_rol.forge(conditions).fetch()
    .then(function(acceso_rol){
      if(!acceso_rol) return res.status(404).json({ error : true, data : { message : 'acceso_rol no existe' } });

      let updateData = {
        rol_id:             req.body.rol_id,
        funcion_id:         req.body.acceso_id,
        ver:                req.body.ver,
        nombre_icono:       req.body.nombre_icono
      }
      
      acceso_rol.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'acceso_rol actualizado'} });
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

  Acceso_rol.forge(conditions).fetch()
    .then(function(acceso_rol){
      if(!acceso_rol) return res.status(404).json({ error : true, data : { message : 'acceso_rol no existe' } });

      acceso_rol.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'acceso_rol eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}