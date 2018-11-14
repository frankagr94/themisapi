//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");

//----dependencias------  
const Usuario = require('../models/usuario');
const Cliente = require('../models/cliente');
const Perfil = require('../models/perfil');
const jwt = require('../services/jwt');
const mailer = require('../services/mailer');
const moment = require('moment')
const generator = require('password-generator');

//----signup------  
function signUp(req,res) {

	Usuario.where({correo: req.body.correo}).fetch().then(data => {
		if(data){
			res.status(404).send({ error: true, data: {message: "Ya existe un usuario con ese correo"} })
		}
		else{
			//----generar contraseña
			let pass = generator(12, false);
			//---- encriptado de contraseña
			let salt = bcrypt.genSaltSync(12);
			let hash = bcrypt.hashSync(pass, salt);
			
			let newUser = {
				id_rol:         '1',
				correo:         req.body.correo,
				contrasenia:    hash,
				ultimo_acceso:  null,
			}

			Usuario.forge(newUser).save()
			.then(function(usuario){  
				let newClient = {
					nombre:             req.body.nombre,
					apellido:           req.body.apellido,
					cedula:             req.body.cedula,
					telefono:           req.body.telefono,
					sexo:          		req.body.sexo,
					//id_ciudad:          req.body.id_ciudad,
					fecha_nacimiento:   req.body.fecha_nacimiento,
					//id_rol:         	'1',
					id_usuario:         usuario.id
				}

				Cliente.forge(newClient).save()
				.then(function(cliente){
					
					//--- Enviar Correo ---
					let asunto = 'Bienvenido a AC Abogados Corporativos - Datos de Acceso'
					let mensaje = 'Gracias por unirte '+newClient.nombre+', tenemos un gran numero de abogados y servicios para ti,para acceder a ellos solo debes usar tu correo y la siguiente contraseña:'+pass;

					mailer.enviarCorreo(newUser.correo,mensaje, asunto);
					//--- Respuesta exitosa ---
					res.status(200).json({ error: false, data: { message : 'Registro exitoso, revise su correo'+newUser.correo }, password:pass });

				})
				.catch(function (err2) {
					res.status(500).json({ error: true, data: {message: err2.message} });
				});

			})
			.catch(function (err3) {
				res.status(500).json({ error: true, data: { message: err3.message } });
			});
		}
	})
}


//----signin------  
function signIn(req,res) {
	
  let conditions = { correo: req.body.correo };

  Usuario.forge(conditions).fetch()
	.then(function(usuario){
		if(!usuario) return res.status(404).send({ error: true, data: {message: "El correo es incorrecto"} })
        
		let isPassword = bcrypt.compareSync(req.body.contrasenia, usuario.get("contrasenia"));
		if(isPassword){

			let updateData = {
           		ultimo_acceso:  moment().format(),
      		}

			usuario.save(updateData)
			.then(function(usuario) {
				res.status(200).json({ error: false, data: { message:"Sesion iniciada", token: jwt.createToken(usuario), id: usuario.get("id"), id_cliente: usuario.get("id_cliente") } })
			})
			.catch(function(err) {
			   res.status(500).json({ error : false, data : {message : err.message} });
			})

		}else{
			res.status(404).send({ error: true, data: {message: "La contraseña es incorrecta"} })
		}
	})
	.catch(function(err){
		res.status(500).send({ error: true, data: { message: err.message }})
	})

}

//----exports------  
module.exports = {
	signUp,
	signIn
}