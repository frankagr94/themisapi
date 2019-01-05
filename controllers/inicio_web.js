//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Inicio_web = require('../models/inicio_web');
const mw = require('../middlewares/uploader');

exports.findInicios = (req,res) => {
  
  Inicio_web.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createInicio = (req,res) => {

  let newData = {
    titulo_nosotros:      req.body.titulo_nosotros,
    texto1_nosotros:      req.body.texto1_nosotros,
    texto2_nosotros:      req.body.texto2_nosotros,
    imagen_nosotros:      '',
    titulo_equipo:        req.body.titulo_equipo,
    titulo_app:           req.body.titulo_app,
    imagen_app:           '',
    texto_app:            req.body.texto_app,
    empresa_id:           req.body.empresa_id 
  }
  
  if(!req.files || !req.files.imagen_nosotros || !req.files.imagen_app){
    res.status(404).json({ error: true, data: { message: 'Debe enviar las 2 imagenes correspondientes' } });
  }
  else{
    mw.uploader(req.files.imagen_nosotros).then(function(result) {
      if(result.error){
        return res.status(500).send({ message : 'hubo un error subiendo imagen_nosotros' })
      }else{
        newData.imagen_nosotros = result.url;
        mw.uploader(req.files.imagen_app).then(function(result2) {
          if(result.error){
            return res.status(500).send({ message : 'hubo un error subiendo imagen_app' })
          }else{
            newData.imagen_app = result2.url;
            Inicio_web.forge(newData).save()
            .then(function(data){
              res.status(200).json({ error: false, data: { message: 'inicio_web creado' } });
            })
            .catch(function (err) {
              res.status(500).json({ error: true, data: {message: err.message} });
            });
          }
        })
      }
    })
  }

}

exports.findOneInicio = (req,res) => {

  let conditions = { id: req.params.id };

  Inicio_web.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'inicio_web no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateInicio = (req,res) => {

  let conditions = { id: req.params.id };

  Inicio_web.forge(conditions).fetch()
    .then(function(inicio_web){
      if(!inicio_web) return res.status(404).json({ error : true, data : { message : 'inicio_web no existe' } });
      //Si existe el inicio_web con ese id, ejecuta lo de abajo
      
      let newData = req.body //instancia una variable auxiliar y le pasa el body de la peticion
      
      if(!req.files){ //si no hay archivos adjuntados en la peticion, guarda lo que encuentra
        console.log("no hay imagenes");
        inicio_web.save(req.body)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'inicio_web actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })
      } 
      else{
        //Si hay archivos, verifica que imagen es para subirla
        if(req.files.imagen_nosotros){ //verifica si existe la imagen_nosotros y la sube
          mw.uploader(req.files.imagen_nosotros).then(function(result) {
            if(result.error){
              return res.status(500).send({ message : 'hubo un error subiendo imagen_nosotros' })
            }else{
              newData.imagen_nosotros = result.url; // si se subio correctamente, la adjunta a lo que se actualizara
              if(req.files.imagen_app){// verifica si existe la imagen_app y la sube
                mw.uploader(req.files.imagen_app).then(function(result2) {
                  if(result2.error){
                    return res.status(500).send({ message : 'hubo un error subiendo imagen_nosotros' })
                  }else{
                    newData.imagen_app = result2.url; // si se subio correctamente, la adjunta a lo que se actualizara
                    inicio_web.save(newData) //actualiza todo con las imagenes que se subieron
                    .then(function(data){
                      return res.status(200).json({ error : false, data : { message : 'inicio_web actualizado'} });
                    })
                    .catch(function(err){
                      return res.status(500).json({ error : false, data : {message : err.message} });
                    })
                  }
                });
              }
            }
          });
        } else if(req.files.imagen_app){//si no existe imagen_nosotros, pero existe la imagen_app la sube
          mw.uploader(req.files.imagen_app).then(function(result2) {
            if(result2.error){
              return res.status(500).send({ message : 'hubo un error subiendo imagen_nosotros' })
            }else{
              newData.imagen_app = result2.url;//si se subio bien, la adjunta a lo que se actualizara
              inicio_web.save(newData)//actualiza la imagen_app con lo demas
              .then(function(data){
                return res.status(200).json({ error : false, data : { message : 'inicio_web actualizado'} });
              })
              .catch(function(err){
                return res.status(500).json({ error : false, data : {message : err.message} });
              })
            }
          });
        }
        else return res.status(404).json({ error : true, data : { message : 'verifique que el nombre de la(s) imagen(es) sea correcto' } }); //si alguna de las imagenes en la peticion no se llama correctamente, suelta ese mensaje
      }
    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })
}

exports.deleteInicio = (req,res) => {

  let conditions = { id: req.params.id };

  Inicio_web.forge(conditions).fetch()
    .then(function(inicio_web){
      if(!inicio_web) return res.status(404).json({ error : true, data : { message : 'inicio_web no existe' } });

      inicio_web.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'inicio_web eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}