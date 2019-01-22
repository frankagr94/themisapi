//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Difusion = require('../models/difusion');
const Bookshelf = require('../db/index')
const knex = Bookshelf.knex;
const Usuario = require('../models/usuario');

exports.findDocuments = (req,res) => {
  
  Difusion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.difundir = (req, res) => {
  Bookshelf.knex({u: 'usuario',c:'caracteristica',p:'perfil_caracteristica',cl:'cliente'})
  .distinct('u.correo', 'u.id')
  .select()
  .whereIn('p.caracteristica_id',[6,9,10])
  .andWhereRaw('cl.id = p.cliente_id')
  .andWhereRaw('u.id = cl.usuario_id')
  .then(function(data){
    res.status(200).json({responde:data});
  })
  .catch(function(err){
    res.status(500).json({ error: true, data: {message: err.message} });
  })
  /*let sql ='select distinct usuario.correo,\
  usuario.id\
  from public.usuario, public.cliente, public.perfil_caracteristica\
  where perfil_caracteristica.caracteristica_id in(6,10,9) and perfil_caracteristica.cliente_id = cliente.id and cliente.usuario_id = usuario.id;'

  Bookshelf.knex.raw(sql)
    .then(function(response){
      res.status(200).json({error: false, data:{response}})
    })
    .catch(function(err){
      res.status(500).json({ error: true, data: {message: err.message} });
    })*/
}

exports.createDocument = (req,res) => {

  let newData = {
    promocion_id:            req.body.promocion_id,
    caracteristica_id:       req.body.caracteristica_id
  }

  difusion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'difusion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Difusion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'difusion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Difusion.forge(conditions).fetch()
    .then(function(difusion){
      if(!difusion) return res.status(404).json({ error : true, data : { message : 'difusion no existe' } });

      difusion.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'difusion actualizado'} });
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

  Difusion.forge(conditions).fetch()
    .then(function(difusion){
      if(!difusion) return res.status(404).json({ error : true, data : { message : 'difusion no existe' } });

      difusion.destroy()
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