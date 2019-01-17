//----dependencias------  
'use strict'
const nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates');
const xoauth2 = require('xoauth2');
//---- Configurar Cuenta ------  
const correoSalida = 'info.themis.eos@gmail.com';
const contraseñaCorreo = 'themisapi';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: correoSalida, // correo emisor
		pass: contraseñaCorreo                  // contraseña del correo
	}
});

const plantillaCorreo = new EmailTemplate({
	message: {
		from: correoSalida,
	}, transport
});

function enviarCorreo(correoDestino, cuerpoMensaje,asunto) {
	//---- Configurar Msj ------  
	let mensaje = cuerpoMensaje;

	//---- Configurar Correo ------  
	let mailOptions = {
	  from: 	correoSalida, //cuenta emisor
	  to: 		correoDestino,     			//cuenta destino
	  subject: 	asunto,     	//asunto msj
	  text: 	mensaje                     //texto msj
	};

	//---- Enviar Correo  ------  
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email enviado: ' + info.response);
	  }
	});

}

function enviarCorreoSuscripcion(correoDestino, clave) {
	//---- Configurar Msj ------  
	/*let mensaje = cuerpoMensaje;

	//---- Configurar Correo ------  
	let mailOptions = {
	  from: 	correoSalida, //cuenta emisor
	  to: 		correoDestino,     			//cuenta destino
	  subject: 	'Bienvenido al mejor bufete!',     	//asunto msj
		text: 	         'Gracias por unirte\
											tenemos un gran numero de abogados y servicios para ti,\
											para acceder a ellos solo debes usar tu correo y la siguiente contraseña:\
											'+clave           //texto msj
	};

	//---- Enviar Correo  ------  
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email enviado: ' + info.response);
	  }
	});*/
	plantillaCorreo.send({
		template:'../files/plantilla/plantilla_correo.html',
		message:{
			to: correoDestino,
		},
		locals:{
			clave:clave
		}
	})
	.then(console.log('Correo enviado satisfacoriamente'))
	.catch(console.error);
}

module.exports = { enviarCorreo, enviarCorreoSuscripcion };

