//----dependencias------  
'use strict'
const Dispositivo = require('../models/dispositivo');

exports.findDispositivos = (req,res) => {
  
  Dispositivo.where({estatus:'A'||'a'}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.saveDispositivo = (req,res) => {

  let newData = {
    token:             req.body.token,
    usuario_id:        req.body.usuario_id,
    estatus:            'A',
  }

  Dispositivo.forge({usuario_id: req.body.usuario_id}).fetch()
  .then(function(disp){
      if(disp){
        return res.status(404).json({ error : true, data : { message : 'ya existe un dispositivo asociado a ese usuario' } });
      }else{
        Dispositivo.forge(newData).save()
        .then(function(data){
            res.status(200).json({ error: false, data: { message: 'dispositivo guardado' } });
        })
        .catch(function (err) {
            res.status(500).json({ error: true, data: {message: err.message} });
        });
      }
    });
}

exports.findOneDispositivo = (req,res) => {

  let conditions = { usuario_id: req.params.usuario_id };

  Dispositivo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'dispositivo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })
}

exports.updateDispositivo = (req,res) => {

  let conditions = { usuario_id: req.params.usuario_id };

  Dispositivo.forge(conditions).fetch()
    .then(function(dispositivo){
      if(!dispositivo) return res.status(404).json({ error : true, data : { message : 'el usuario no tiene dispositivo asociado' } });
      
      dispositivo.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'dispositivo actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })
}



exports.deleteDispositivo = (req,res) => {

  let conditions = { usuario_id: req.params.usuario_id };

  Dispositivo.forge(conditions).fetch()
    .then(function(dispositivo){
      if(!dispositivo) return res.status(404).json({ error : true, data : { message : 'no hay un dispositivo asociado a ese usuario' } });

      dispositivo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'dispositivo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}