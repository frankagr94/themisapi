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

	//----generar contraseña
	let pass = generator(12, false);
	console.log(pass);
	//---- encriptado de contraseña
	//  let salt = bcrypt.genSaltSync(12);
	//  let hash = bcrypt.hashSync(pass, salt);
	
	// let newUser = {
	//     id_rol:         req.body.id_rol,
	//     correo:         req.body.correo,
	//     contrasenia:    hash,
	//     ultimo_acceso:  null,
	//   }

	  //Usuario.forge(newUser).save()
	  
	  let newClient = {
		nombre:             req.body.nombre,
		apellido:           req.body.apellido,
		cedula:             req.body.cedula,
		telefono:           req.body.telefono,
		sexo:          		req.body.sexo,
		//id_ciudad:          req.body.id_ciudad,
		fecha_nacimiento:   req.body.fecha_nacimiento,
		id_rol:         	'1',
	}

	Cliente.forge(newClient).save()
	.then(function(cliente){

		let newUser = {
			//id_rol:         req.body.id_rol,
			correo:         req.body.correo,
			contrasenia:    pass,
			ultimo_acceso:  null,
			id_cliente:     cliente.id
		}

		Usuario.forge(newUser).save()
		.then(function(usuario){

			// if(req.body.perfil){

			// 	for (var i = 0; i < req.body.perfil.length; i++) {
				
			// 		let newProfile = {
			// 			id_valor_parametro: 	req.body.perfil[i],
			// 			id_cliente:    		  	cliente.id,
			// 			estatus: 	          	'A',
			// 		}

			// 		Perfil.forge(newProfile).save()
			// 		.then(function(perfil){
			// 			console.log('valor parametro guardado')
			// 		})
			// 		.catch(function (err) {
			// 		    console.log(err);
			// 		});

			// 	}

			// }
			
			//--- Enviar Correo ---
			let asunto = 'Bienvenido a AC Abogados Corporativos - Datos de Acceso'
			let mensaje = 'Gracias por unirte '+newClient.nombre+', tenemos un gran numero de abogados y servicios para ti,para acceder a ellos solo debes usar tu correo y la siguiente contraseña:'+pass;

			mailer.enviarCorreo(newUser.correo,mensaje, asunto);
			//--- Respuesta exitosa ---
			res.status(200).json({ error: false, data: { message : 'Registro exitoso' }, password:pass });

		})
		.catch(function (err2) {
			res.status(500).json({ error: true, data: {message: err2.message} });
		});

	})
	.catch(function (err3) {
		res.status(500).json({ error: true, data: { message: err3.message } });
	});
}
//----signin------  
function signIn(req,res) {
	
  let conditions = { correo: req.body.correo };

  Usuario.forge(conditions).fetch()
	.then(function(usuario){
		if(!usuario) return res.status(404).send({message:"El usuario no existe"})
        
		let isPassword = req.body.contrasenia;
		//bcrypt.compareSync(req.body.contrasenia, usuario.get("contrasenia"))
		if(isPassword){

			let updateData = {
           		ultimo_acceso:  moment().format(),
      		}

			usuario.save(updateData)
			.then(function(usuario) {
				res.status(200).json({ error: false, data: { message:"Sesion iniciada", token: jwt.createToken(usuario), id: usuario.get("id"), id_rol: usuario.get("id_rol") } })
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