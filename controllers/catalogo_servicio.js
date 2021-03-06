//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Catalogo_servicio = require('../models/catalogo_servicio');
const util = require('../middlewares/utils');
const upload = require('../middlewares/uploader');

exports.findCatalogos = (req,res) => {
  
  Catalogo_servicio.where({estatus:'A'||'a'}).fetchAll({
    withRelated:['valoraciones','valoraciones.rangos']
  })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.catalogoPorCategoria = (req,res) => {
  
  Catalogo_servicio.where({categoria_id:req.params.id}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.catalogoVisiblesPorCategoria = (req,res) => {
  
  Catalogo_servicio.where({categoria_id:req.params.id, visible:true}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createCatalogo = (req,res) => {

  let newData = {
    nombre:                req.body.nombre,
    descripcion:           req.body.descripcion,
    imagen:                '',
    estatus:               'A',
    fecha_creacion:        util.fecha(),
    categoria_id:          req.body.categoria_id,
    visible:               true
  }

  if(!req.files){
    res.status(404).json({ error: true, data: { message: 'Debe seleccionar una imagen para el nuevo servicio' } });
  }
  else{
    upload.uploader(req.files.imagen).then(function(result) {
      if(result.error){
        return res.status(500).send({ message : 'hubo un error' })
      }else{
        newData.imagen = result.url;
        Catalogo_servicio.forge(newData).save()
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'catalogo_servicio creado' } });
        })
        .catch(function (err) {
          res.status(500).json({ error: true, data: {message: err.message} });
        });
      }
    })
  }
}

exports.mostrarVisibles = (req, res)=> {
  Catalogo_servicio.where({visible: true}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });
}

exports.hacerVisible = (req, res)=>{
  Catalogo_servicio.forge({id: req.params.id}).fetch()
    .then(function(catalogo_servicio){
      if(!catalogo_servicio){
        res.status(404).send({ error: true, data: {message: `El servicio con id ${req.params.id} no existe`} })
      }
      catalogo_servicio.save({visible:req.body.visible})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'servicio visible'} });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
}

exports.findOneCatalogo = (req,res) => {

  let conditions = { id: req.params.id };

  Catalogo_servicio.forge(conditions).fetch({
    withRelated:['valoraciones','valoraciones.rangos']
  })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.cambiarEstatus = (req,res) => {

  let conditions = { id: req.params.id };

  Catalogo_servicio.forge(conditions).fetch()
    .then(function(catalogo_servicio){
      if(!catalogo_servicio) return res.status(404).json({ error : true, data : { message : 'servicio del catalogo no existe' } });
      catalogo_servicio.save({estatus:req.body.estatus})
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estatus del servicio del catalogo actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.asociarActuaciones = (req, res)=>{
  let conditions = { id: req.body.catalogo_servicio_id};

  Catalogo_servicio.forge(conditions).fetch()
    .then(function(catalogo_servicio){
      catalogo_servicio.actuaciones().attach(req.body.actuacion_id)
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'Actuaciones asociadas al catalogo' } });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err.message} });
    })
}

exports.asociarDocumentos = (req, res)=>{
  let conditions = { id: req.body.catalogo_servicio_id};

  Catalogo_servicio.forge(conditions).fetch()
    .then(function(catalogo_servicio){
      catalogo_servicio.recaudos().attach(req.body.documento_id)
        .then(function(data){
          res.status(200).json({ error: false, data: { message: 'Recaudos asociados al catalogo' } });
        })
        .catch(function(err){
          res.status(500).json({ error: true, data: {message: err.message} });
        });
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err.message} });
    })
}

exports.updateCatalogo = (req,res) => {

  let conditions = { id: req.params.id };

  Catalogo_servicio.forge(conditions).fetch()
    .then(function(catalogo_servicio){
      if(!catalogo_servicio) return res.status(404).json({ error : true, data : { message : 'catalogo_servicio no existe' } });

      if(!req.files){
        catalogo_servicio.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'servicio actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })
      }
      else{
        upload.uploader(req.files.imagen).then(function(result) {
          if(result.error){
            return res.status(500).send({ message : 'hubo un error' })
          }
          else{
            let newData = req.body
            newData.imagen = result.url
            catalogo_servicio.save(newData)
            .then(function(data){
              res.status(200).json({ error : false, data : { message : 'servicio actualizado'} });
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

exports.deleteCatalogo = (req,res) => {

  let conditions = { id: req.params.id };

  Catalogo_servicio.forge(conditions).fetch()
    .then(function(catalogo_servicio){
      if(!catalogo_servicio) return res.status(404).json({ error : true, data : { message : 'catalogo_servicio no existe' } });

      catalogo_servicio.save({estatus:'I'})
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'catalogo_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}