'use strict'
const mailer = require('../services/mailer');

exports.correoActuacion =(req, res)=>{
    try {
        mailer.enviarCorreoActuacion(req.body.correo, req.body.actuacion, req.body.servicio );   
        res.status(200).json({error:false, data:{message: 'Correo enviado satisfactoriamnete'} });
    } catch (error) {
        res.status(500).json({error:true, data: {message: error.message}});
    }
}

exports.apertura =(req, res)=>{
    try {
        mailer.enviarCorreoApertura(req.body.correo, req.body.servicio);   
        res.status(200).json({error:false, data:{message: 'Correo enviado satisfactoriamnete'} });
    } catch (error) {
        res.status(500).json({error:true, data: {message: error.message}});
    }
}

exports.cierre =(req, res)=>{
    try {
        mailer.enviarCorreoCierre(req.body.correo);   
        res.status(200).json({error:false, data:{message: 'Correo enviado satisfactoriamnete'} });
    } catch (error) {
        res.status(500).json({error:true, data: {message: error.message}});
    }
}

exports.reclamoAceptado =(req, res)=>{
    try {
        mailer.enviarCorreoReclamoAceptado(req.body.correo);   
        res.status(200).json({error:false, data:{message: 'Correo enviado satisfactoriamnete'} });
    } catch (error) {
        res.status(500).json({error:true, data: {message: error.message}});
    }
}

exports.reclamoRechazado =(req, res)=>{
    try {
        mailer.enviarCorreoRechazoReclamo(req.body.correo);   
        res.status(200).json({error:false, data:{message: 'Correo enviado satisfactoriamnete'} });
    } catch (error) {
        res.status(500).json({error:true, data: {message: error.message}});
    }
}

exports.solicitudAceptada =(req, res)=>{
    try {
        mailer.enviarCorreoSolicitudAceptada(req.body.correo, req.body.servicio );   
        res.status(200).json({error:false, data:{message: 'Correo enviado satisfactoriamnete'} });
    } catch (error) {
        res.status(500).json({error:true, data: {message: error.message}});
    }
}

exports.solicitudCita =(req, res)=>{
    try {
        mailer.enviarCorreoCita(req.body.correo, req.body.fecha, req.body.hora );   
        res.status(200).json({error:false, data:{message: 'Correo enviado satisfactoriamnete'} });
    } catch (error) {
        res.status(500).json({error:true, data: {message: error.message}});
    }
}

exports.solicitudRechazada =(req, res)=>{
    try {
        mailer.enviarCorreoSolicitudRechazada(req.body.correo, req.body.servicio );   
        res.status(200).json({error:false, data:{message: 'Correo enviado satisfactoriamnete'} });
    } catch (error) {
        res.status(500).json({error:true, data: {message: error.message}});
    }
}