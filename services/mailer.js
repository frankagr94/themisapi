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

function enviarCorreoSuscripcion(correoDestino, contrasenia) {
	readHTMLFile(__dirname+'/../files/plantilla/plantilla_correo.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {
			usuario: JSON.stringify(correoDestino),
			clave: JSON.stringify(contrasenia) 
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

function enviarCorreoSolicitudAceptada(correoDestino, servicio) {
	readHTMLFile(__dirname+'/../files/plantilla/solicitudAceptada.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {
			servicio:servicio
		};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Sobre su solicitud de servicio`,
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

function enviarCorreoSolicitudRechazada(correoDestino, servicio) {
	readHTMLFile(__dirname+'/../files/plantilla/solicitudRechazada.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {
			servicio:servicio
		};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Sobre su solicitud de servicio`,
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

function enviarCorreoCita(correoDestino, fecha, hora) {
	readHTMLFile(__dirname+'/../files/plantilla/casoCerrado.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {
			fecha:fecha,
			hora:hora
		};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Tiene una cita programada`,
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

function enviarCorreoPromocion(correoDestino, promocion) {
	readHTMLFile(__dirname+'/../files/plantilla/promocion.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {
			imagen: promocion.imagen,
			nombre: promocion.nombre,
			descripcion: promocion.descripcion,			 
		};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Excelente oportunidad para ti con la promocion ${promocion.nombre}`,
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

function enviarCorreoApertura(correoDestino, servicio) {
	readHTMLFile(__dirname+'/../files/plantilla/casoApertura.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {
			servicio: servicio,
			descripcion: JSON.stringify(promocion.descripcion),			 
		};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Detalle de su solicitud de servicio`,
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

function enviarCorreoCierre(correoDestino) {
	readHTMLFile(__dirname+'/../files/plantilla/casoCerrado.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Detalle de su caso`,
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

function enviarCorreoActuacion(correoDestino, actuacion, servicio) {
	readHTMLFile(__dirname+'/../files/plantilla/actuacionRealizada.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {
			actuacion: actuacion,
			servicio: servicio
		};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Detalle de su caso`,
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
function enviarCorreoReclamoAceptado(correoDestino) {
	readHTMLFile(__dirname+'/../files/plantilla/aceptarReclamo.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Detalle de su reclamo`,
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

function enviarCorreoRechazoReclamo(correoDestino) {
	readHTMLFile(__dirname+'/../files/plantilla/rechazarReclamo.hbs', function(err, html){
		var template = handlebars.compile(html);
		var replacements = {};
		var htmlToSend = template(replacements);
		let mailOptions = {
			from: 	correoSalida, //cuenta emisor
			to: 		correoDestino,     			//cuenta destino
			subject: 	`Detalle de su reclamo`,
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

module.exports = { 
	enviarCorreo,
	enviarCorreoSuscripcion, 
	enviarCorreoPromocion, 
	enviarCorreoActuacion, 
	enviarCorreoApertura,
	enviarCorreoCierre, 
	enviarCorreoCita, 
	enviarCorreoRechazoReclamo, 
	enviarCorreoReclamoAceptado, 
	enviarCorreoSolicitudAceptada,
	enviarCorreoSolicitudRechazada
 };

