//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Recaudo_servicio = require('../models/recaudo_servicio');

exports.findRecaudo_servicios = (req,res) => {
  
  Recaudo_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createRecaudo_servicio = (req,res) => {

  let newData = {
    documento_id:           req.body.actuacion_id,
    catalogo_servicio_id:   req.body.catalogo_servicio_id,
    estatus:                'A'
  }

  recaudo_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'recaudo servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneRecaudo_servicio = (req,res) => {

  let conditions = { id: req.params.id };

  Recaudo_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'recaudo servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateRecaudo_servicio = (req,res) => {

  let conditions = { id: req.params.id };

  recaudo_servicio.forge(conditions).fetch()
    .then(function(recaudo_servicio){
      if(!recaudo_servicio) return res.status(404).json({ error : true, data : { message : 'recaudo servicio no existe' } });

      recaudo_servicio.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'recaudo_servicio actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteRecaudo_servicio = (req,res) => {

  let conditions = { id: req.params.id };

  recaudo_servicio.forge(conditions).fetch()
    .then(function(recaudo_servicio){
      if(!recaudo_servicio) return res.status(404).json({ error : true, data : { message : 'recaudo servicio no existe' } });

      recaudo_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'recaudo servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}