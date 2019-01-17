//----dependencias------  
'use strict'
const nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates');
const xoauth2 = require('xoauth2');
//---- Configurar Cuenta ------  
const correoSalida = 'info.themis.eos@gmail.com';
const contraseñaCorreo = 'themisapi';
const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function(path, callback) {
	fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
			if (err) {
					throw err;
					callback(err);
			}
			else {
					callback(null, html);
			}
	});
};

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
	}, transporter
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
	readHTMLFile(__dirname+'/../files/plantilla/plantilla_correo.html', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {
			clave: clave 
		};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	'Bienvenido al mejor bufete!',
			html: htmlToSend
		};
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email enviado: ' + info.response);
			}
		});
	})
}

module.exports = { enviarCorreo, enviarCorreoSuscripcion };

