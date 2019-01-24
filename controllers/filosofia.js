//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Filosofia = require('../models/filosofia');
const mw = require('../middlewares/uploader');

exports.findFilosofias = (req,res) => {
  
  Filosofia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createFilosofia = (req,res) => {

  let newData = {
    titulo:      req.body.titulo,
    texto:       req.body.texto,
    mision:      req.body.mision,
    vision:      req.body.vision,
    valor1:      req.body.valor1,
    valor2:      req.body.valor2,
    valor3:      req.body.valor3,
    imagen_mision: '',
    imagen_vision: '',
    imagen_valores: '',
    inicio_web_id:  req.body.inicio_web_id 
  }

  let imagen_errors = [];
  let exito = 0;

  if(!req.files || !req.files.imagen_mision || !req.files.imagen_vision || !req.files.imagen_valores){
    res.status(404).json({ error: true, data: { message: 'Debe enviar las 3 imagenes correspondientes' } });
  }
  else{
    mw.uploader(req.files.imagen_mision).then(function(result) {
      if(result.error){
        imagen_errors.push({imagen:"mision", error:"fallo al subir"});
      }else{
        exito++;
        newData.imagen_mision = result.url;
        mw.uploader(req.files.imagen_vision).then(function(result2) {
          if(result2.error){
            imagen_errors.push({imagen:"vision", error:"fallo al subir"});
          }else{
            exito++;
            newData.imagen_vision = result2.url;
            mw.uploader(req.files.imagen_valores).then(function(result3) {
              if(result3.error){
                imagen_errors.push({imagen:"valores", error:"fallo al subir"});
              }else{
                exito++;
                newData.imagen_valores = result3.url;
                Filosofia.forge(newData).save()
                .then(function(data){
                  res.status(200).json({ error: false, data: { message: 'filosofia creado con 3 imagenes', exitos: exito, imagen_errores:imagen_errors } });
                })
                .catch(function (err) {
                  res.status(500).json({ error: true, data: {message: err.message} });
                });
              }
            });
          }
        });
      }
    })
  }


}

exports.findOneFilosofia = (req,res) => {

  let conditions = { id: req.params.id };

  Filosofia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'filosofia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateFilosofia = (req,res) => {

  let conditions = { id: req.params.id };
  let imagen_errors = [];
  let exito = 0;

  Filosofia.forge(conditions).fetch()
    .then(function(filosofia){
      if(!filosofia) return res.status(404).json({ error : true, data : { message : 'filosofia no existe' } });

      let newData = req.body;

      if(!req.files){ //si no hay archivos adjuntados en la peticion, guarda lo que encuentra
        filosofia.save(newData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'filosofia actualizada sin imagenes'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })
      }
      else{
        //Si hay archivos, verifica que imagen es para subirla
        if(req.files.imagen_mision){ //verifica si existe la imagen_mision y la sube
          mw.uploader(req.files.imagen_mision).then(function(result) {
            if(result.error){
              imagen_errors.push({imagen:"mision", error:"fallo al subir"});
            }else{
              exito++;
              newData.imagen_mision = result.url; // si se subio correctamente, la adjunta a lo que se actualizara
              if(req.files.imagen_vision){ //verifica si existe la imagen_vision y la sube
                mw.uploader(req.files.imagen_vision).then(function(result2) {
                  if(result2.error){
                    imagen_errors.push({imagen:"vision", error:"fallo al subir"});
                  }else{
                    exito++;
                    newData.imagen_vision = result2.url; // si se subio correctamente, la adjunta a lo que se actualizara
                    if(req.files.imagen_valores){ //verifica si existe la imagen_valores y la sube
                      mw.uploader(req.files.imagen_valores).then(function(result3) {
                        if(result3.error){
                          imagen_errors.push({imagen:"valores", error:"fallo al subir"});
                        }else{
                          exito++;
                          newData.imagen_valores = result3.url; // si se subio correctamente, la adjunta a lo que se actualizara
                          filosofia.save(newData)//estan las 3 y se guardan las 3
                          .then(function(data){
                            res.status(200).json({ error : false, data : { message : 'filosofia actualizado con 3 imagenes', exitos: exito, imagen_errores:imagen_errors} });
                          })
                          .catch(function(err){
                            res.status(500).json({ error : false, data : {message : err.message} });
                          })
                        }
                      });
                    }
                    else{//esta la primera y la segunda solamente
                      filosofia.save(newData)
                      .then(function(data){
                        res.status(200).json({ error : false, data : { message : 'filosofia actualizado con 2 imagenes', exitos: exito, imagen_errores:imagen_errors} });
                      })
                      .catch(function(err){
                        res.status(500).json({ error : false, data : {message : err.message} });
                      })
                    }
                  }
                });
              }
              else{//esta solamente la primera
                filosofia.save(newData)
                .then(function(data){
                  res.status(200).json({ error : false, data : { message : 'filosofia actualizado con 1 imagen', exitos: exito, imagen_errores:imagen_errors} });
                })
                .catch(function(err){
                  res.status(500).json({ error : false, data : {message : err.message} });
                })
              }
            }
          });
        }
        else{//no existe la primera, verifica la segunda
          if(req.files.imagen_vision){ //verifica si existe la imagen_vision y la sube
            mw.uploader(req.files.imagen_vision).then(function(result2) {
              if(result2.error){
                imagen_errors.push({imagen:"vision", error:"fallo al subir"});
              }else{
                exito++;
                newData.imagen_vision = result2.url; // si se subio correctamente, la adjunta a lo que se actualizara
                if(req.files.imagen_valores){ //verifica si existe la imagen_valores y la sube
                  mw.uploader(req.files.imagen_valores).then(function(result3) {
                    if(result3.error){
                      imagen_errors.push({imagen:"valores", error:"fallo al subir"});
                    }else{
                      exito++;
                      newData.imagen_valores = result3.url; // si se subio correctamente, la adjunta a lo que se actualizara
                      filosofia.save(newData)//estan las 3 y se guardan las 3
                      .then(function(data){
                        res.status(200).json({ error : false, data : { message : 'filosofia actualizado con 2 imagenes', exitos: exito, imagen_errores:imagen_errors} });
                      })
                      .catch(function(err){
                        res.status(500).json({ error : false, data : {message : err.message} });
                      })
                    }
                  });
                }
                else{//esta la primera y la segunda solamente
                  filosofia.save(newData)
                  .then(function(data){
                    res.status(200).json({ error : false, data : { message : 'filosofia actualizado con 2 imagenes', exitos: exito, imagen_errores:imagen_errors} });
                  })
                  .catch(function(err){
                    res.status(500).json({ error : false, data : {message : err.message} });
                  })
                }
              }
            });
          }
          else{//no esta la primera ni la segunda, verifica la 3ra
            if(req.files.imagen_valores){ //verifica si existe la imagen_valores y la sube
              mw.uploader(req.files.imagen_valores).then(function(result3) {
                if(result3.error){
                  imagen_errors.push({imagen:"valores", error:"fallo al subir"});
                }else{
                  exito++;
                  newData.imagen_valores = result3.url; // si se subio correctamente, la adjunta a lo que se actualizara
                  filosofia.save(newData)//estan las 3 y se guardan las 3
                  .then(function(data){
                    res.status(200).json({ error : false, data : { message : 'filosofia actualizado con 1 imagen', exitos: exito, imagen_errores:imagen_errors} });
                  })
                  .catch(function(err){
                    res.status(500).json({ error : false, data : {message : err.message} });
                  })
                }
              });
            }
          }
        }
      }

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteFilosofia = (req,res) => {

  let conditions = { id: req.params.id };

  Filosofia.forge(conditions).fetch()
    .then(function(filosofia){
      if(!filosofia) return res.status(404).json({ error : true, data : { message : 'filosofia no existe' } });

      filosofia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'filosofia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}