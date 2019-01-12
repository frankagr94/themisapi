//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Servicio = require('../models/servicio');
const fs = require("fs");

exports.findServicios = (req,res) => {
  
  Servicio.where({estatus:'A'||'a'}).fetchAll({
    withRelated:[
      'cliente',
      'servicio',
      'actuaciones'      
    ]
  })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createServicio = (req,res) => {

  // ----- Extension Imagen -----
  /*if(req.files.archivo) {
    var extension = req.files.archivo.name.split(".").pop();
  }else{
    var extension = null;
  }*/

  let newData = {
    cliente_id:         req.body.cliente_id, 
    abogado_id:         req.body.abogado_id,
    catalogo_servicio_id: req.body.catalogo_servicio_id,
    descripcion:        req.body.descripcion,
    pagado:             req.body.pagado,
    estatus:            'A',
    fecha_creado:       req.body.fecha_creado,
    fecha_cierre:       req.body.fecha_cierre
  }

  Servicio.forge(newData).save()
  .then(function(data){
    // ----- Guardar Imagen -----
    //if(req.files.archivo) fs.rename(req.files.archivo.path, "files/servicio/"+data.id+"."+extension);

    res.status(200).json({ error: false, data: { message: 'servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneServicio = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio.forge(conditions).fetch({
    withRelated:[
      'cliente',
      'servicio',
      'actuaciones'      
    ]
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.asociarActuaciones = (req, res)=>{
  let conditions = { id: req.body.id_servicio};

  Servicio.forge(conditions).fetch()
    .then(function(servicio){
      servicio.actuaciones().attach({actuacion_id:req.body.actuacion_id,estatus:'P', fecha_plan: req.body.fecha_plan, horario_id:req.body.horario_id, abogado_id: req.body.abogado_id})
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'Actuaciones asociadas al servicio' } });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err.message} });
    })
}

exports.asociarRecaudos = (req, res)=>{
  let conditions = { id: req.body.id_servicio};

  Servicio.forge(conditions).fetch()
    .then(function(servicio){
      servicio.documentos().attach({documento_id:req.body.documento_id,estatus:'P'})
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'Actuaciones asociadas al servicio' } });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err.message} });
    })
}

exports.asociarAbogados = (req, res)=>{
  let conditions = { id: req.body.id_servicio};

  Servicio.forge(conditions).fetch()
    .then(function(servicio){
      servicio.abogados().attach({abogado_id:req.body.abogado_id})
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'Actuaciones asociadas al servicio' } });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err.message} });
    })
}

exports.updateServicio = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio.forge(conditions).fetch()
    .then(function(servicio){
      if(!servicio) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });

      // ----- Extension Imagen -----
      /*if(req.files.archivo) {
        var extension = req.files.archivo.name.split(".").pop();
      }*/

      servicio.save(req.body)
        .then(function(data){
          // ----- Guardar Imagen -----
          //if(req.files.archivo) fs.rename(req.files.archivo.path, "files/servicio/"+data.id+"."+extension);

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

exports.deleteServicio = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio.forge(conditions).fetch()
    .then(function(servicio){
      if(!servicio) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });

      servicio.save({estatus:'I'})
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