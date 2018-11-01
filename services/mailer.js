//----dependencias------  
'use strict'
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
//---- Configurar Cuenta ------  
const correoSalida = 'info.themis.eos@gmail.com';
const contraseñaCorreo = 'themisapi';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	secure:true,
	auth: {
		xoauth2: xoauth2.createXOAuth2Generator({
			user: correoSalida,
			clientId:'433387933000-2p0av99j18t98rshtpuad8e3eqs5r91b.apps.googleusercontent.com',
			clientSecret:'rfmY8To16Xd4eegYq8OnTW2K',
			refreshToken:'1/iGOePYcjxkC8Hd63ljSairmLhKT_VBmMG-HxXU5qmqY'

		})
	}
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
	let mensaje = cuerpoMensaje;

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
	});

}

module.exports = { enviarCorreo, enviarCorreoSuscripcion };

