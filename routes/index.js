//----dependencias------ 
'use strict'
const express = require('express');
const auth = require('../middlewares/auth');

//---- GESTIONES ------
const gestion_calificacion = require('./gestion_calificacion');
const gestion_consejo = require('./gestion_consejo');
const gestion_promocion = require('./gestion_promocion');
const gestion_servicio = require('./gestion_servicio');
const gestion_solicitud = require('./gestion_solicitud');
const gestion_tipo_parametro = require('./gestion_tipo_parametro');

//---- Vistas ------
const vista_abogado = require('./vista_abogado');
const vista_actuacion_catalogo = require('./vista_actuacion_catalogo');
const vista_agendas = require('./vista_agendas');
const vista_agenda = require('./vista_agenda');
const vista_calificacion_orden = require('./vista_calificacion_orden');
const vista_caracteristica = require('./vista_caracteristica');
const vista_cita = require('./vista_cita');
const vista_cliente_comentario = require('./vista_cliente_comentario');
const vista_cliente_consejo = require('./vista_cliente_consejo');
const vista_cliente_abogado = require('./vista_cliente_abogado');
const vista_cliente_perfil = require('./vista_cliente_perfil');
const vista_cliente_promocion = require('./vista_cliente_promocion');
const vista_cliente_reclamo = require('./vista_cliente_reclamo');
const vista_cliente_servicio = require('./vista_cliente_servicio');
const vista_cliente_solicitud = require('./vista_cliente_solicitud');
const vista_comentario = require('./vista_comentario');
const vista_detalle_consejo = require('./vista_detalle_consejo');
const vista_detalle_promocion = require('./vista_detalle_promocion');
const vista_detalle_proveedor = require('./vista_detalle_proveedor');
const vista_detalle_servicios_true = require('./vista_detalle_servicios_true');
const vista_empleados_categoria = require('./vista_empleados_categoria');
const vista_empleado = require('./vista_empleado');
const vista_especialidad = require('./vista_especialidad');
const vista_horario = require('./vista_horario');
const vista_incidencia = require('./vista_incidencia');
const vista_incidencia_de_orden = require('./vista_incidencia_de_orden');
const vista_insumo_asociados = require('./vista_insumo_asociados');
const vista_insumos = require('./vista_insumos');
const vista_orden = require('./vista_orden');
const vista_orden_cita = require('./vista_orden_cita');
const vista_perfil = require('./vista_perfil');
const vista_presupuesto = require('./vista_presupuesto');
const vista_recaudo_catalogo = require('./vista_recaudo_catalogo');
const vista_recaudo_servicio = require('./vista_recaudo_servicio');
const vista_reclamo = require('./vista_reclamo');
const vista_red_social_empleado = require('./vista_red_social_empleado');
const vista_respuesta_presupuesto = require('./vista_respuesta_presupuesto');
const vista_respuesta_solicitud = require('./vista_respuesta_solicitud');
const vista_roles = require('./vista_roles');
const vista_servicio_categoria = require('./vista_servicio_categoria');
const vista_servicio_con_incidencia = require('./vista_servicio_con_incidencia');
const vista_servicio_abogado = require('./vista_servicio_abogado');
const vista_servicio = require('./vista_servicio');
const vista_servicio_solicitud =require('./vista_servicio_solicitud');
const vista_servicios_calificados = require('./vista_servicios_calificados');
const vista_servicios_con_garantia = require('./vista_servicios_con_garantia');
const vista_solicitud = require('./vista_solicitud');
const vista_solicitud_insumo = require('./vista_solicitud_insumo');
const vista_solicitud_rechazada = require('./vista_solicitud_rechazada');
const vista_sugerencia = require('./vista_sugerencia');
const vista_todas_promociones = require('./vista_todas_promociones');
const vista_todos_consejos = require('./vista_todos_consejos');
const vista_todos_servicio_garantia = require('./vista_todos_servicio_garantia');
const vista_todos_servicios = require('./vista_todos_servicios');
const vista_tr_valoracion = require('./vista_tr_valoracion');
const vista_usuario = require('./vista_usuario');
const vista_valoracion = require('./vista_valoracion');
//----CORREOS
const correos = require('./correo');
//----REPORTES
const reporte_incidencia = require('./reporte_incidecia');
const reporte_promocion = require('./reporte_promocion');
const reporte_reclamo = require('./reporte_reclamo');
const reporte_servicio = require('./reporte_servicio');
const reporte_solicitud = require('./reporte_solicitud');
const reporte_sugerencia = require('./reporte_sugerencia');
//----ESTADISTICOS
const estadistico_servicio = require('./estadistico_servicio');
const estadistico_incidencia = require('./estadistico_incidencia');
const estadistico_incidencia2 = require('./estadistico_incidencia2');
const estadistico_sugerencia = require('./estadistico_sugerencia');
const estadistico_promocion = require('./estadistico_promocion');
const estadistico_reclamo = require('./estadistico_reclamo');
//----TABLAS BASICAS------
const acceso_rol = require('./acceso_rol');
const actuacion = require('./actuacion');
const actuacion_catalogo = require('./actuacion_catalogo');
const actuacion_servicio = require('./actuacion_servicio');
const abogado_servicio = require('./abogado_servicio');
const agenda = require('./agenda');
const auditoria = require('./auditoria');
const bloque = require('./bloque');
const bloque_hora = require('./bloque_hora');
const calificacion_orden = require('./calificacion_orden');
const catalogo_servicio = require('./catalogo_servicio');
const categoria = require('./categoria');
const calificacion_servicio = require('./calificacion_servicio');
const canal_escucha = require('./canal_escucha');
const categoria_parametro = require('./categoria_parametro');
const categoria_servicio = require('./categoria_servicio');
const caracteristica = require('./caracteristica');
const caracteristica_base = require('./caracteristica_base');
const cita = require('./cita');
const ciudad = require('./ciudad');
const cliente = require('./cliente');
const comentario = require('./comentario');
const consejo = require('./consejo');
const conocenos_web = require('./conocenos_web');
const contacto_negocio = require('./contacto_negocio');
const criterio = require('./criterio');
const descripcion_negocio = require('./descripcion_negocio');
const detalle_consejo = require('./detalle_consejo');
const detalle_promocion = require('./detalle_promocion');
const detalle_proveedor = require('./detalle_proveedor');
const detalle_servicio = require('./detalle_servicio');
const dia_semana = require('./dia_semana');
const dia_laborable = require('./dia_laborable');
const difusion = require('./difusion');
const dispositivo = require('./dispositivo');
const recaudo_catalogo = require('./recaudo_catalogo');
const documento = require('./documento');
const empleado = require('./empleado');
const empleado_asignado = require('./empleado_asignado');
const especialidad = require('./especialidad');
const estado = require('./estado');
const estado_civil = require('./estado_civil');
const filosofia = require('./filosofia');
const funcion = require('./funcion');
const garantia = require('./garantia');
const horario = require('./horario');
const horario_empleado = require('./horario_empleado');
const imagen = require('./imagen');
const imagen_carrusel=require('./imagen_carrusel');
const incidencia = require('./incidencia');
const incidencia_orden = require('./incidencia_orden');
const incidencia_servicio = require('./incidencia_servicio');
const insumo = require('./insumo');
const inicio_web = require('./inicio_web');
const insumo_asociado = require('./insumo_asociado');
const insumo_usado = require('./insumo_usado');
const empresa = require('./empresa');
const notificacion = require('./notificacion');
const objetivo = require('./objetivo_empresa');
const orden_servicio = require('./orden_servicio');
const pais = require('./pais');
const parametro = require('./parametro');
const perfil = require('./perfil');
const presupuesto = require('./presupuesto');
const promocion = require('./promocion');
const proveedor = require('./proveedor');
const razon_incidencia = require('./razon_incidencia');
const reclamo = require('./reclamo');
const recaudo_servicio = require('./recaudo_servicio');
const red_social = require('./red_social');
const rango_valoracion = require('./rango_valoracion');
const respuesta_sugerencia = require('./respuesta_sugerencia');
const respuesta_incidencia = require('./respuesta_incidencia');
const respuesta_reclamo = require('./respuesta_reclamo');
const respuesta_solicitud = require('./respuesta_solicitud');
const rol = require('./rol');
const rol_funcion = require('./rol_funcion');
const ruta = require('./ruta');
const servicio = require('./servicio');
const servicio_parametro = require('./servicio_parametro');
const servicio_solicitado = require('./servicio_solicitado');
const sistema = require('./sistema');
const solicitud = require('./solicitud');
const solicitud_rechazo = require('./solicitud_rechazo');
const sugerencia = require('./sugerencia');
const suscripcion = require('./suscripcion');
const tipo_cliente = require('./tipo_cliente');
const tipo_actuacion = require('./tipo_actuacion');
const tipo_comentario = require('./tipo_comentario');
const tipo_documento = require('./tipo_documento');
const tipo_incidencia = require('./tipo_incidencia');
const tipo_empleado = require('./tipo_empleado');
const tipo_garantia = require('./tipo_garantia');
const tipo_notificacion = require('./tipo_notificacion');
const tipo_parametro = require('./tipo_parametro');
const tipo_reclamo = require('./tipo_reclamo');
const tipo_respuesta = require('./tipo_respuesta');
const tipo_respuesta_comentario = require('./tipo_respuesta_comentario');
const tipo_respuesta_presupuesto = require('./tipo_respuesta_presupuesto');
const tipo_respuesta_reclamo = require('./tipo_respuesta_reclamo');
const tipo_respuesta_solicitud = require('./tipo_respuesta_solicitud');
const tipo_servicio = require('./tipo_servicio');
const tipo_sugerencia = require('./tipo_sugerencia');
const tipo_valoracion = require('./tipo_valoracion');
const tipo_valoracion_rango_valoracion = require('./tipo_valoracion_rango_valoracion');
const titulo_seccion = require('./titulo_seccion');
const unidad = require('./unidad');
const usuario = require('./usuario');
const valor_parametro = require('./valor_parametro');
const valoracion = require('./valoracion');
const valoracion_catalogo = require('./valoracion_catalogo');
//----- Busqueda Foranea -------
const usuario_cliente = require('./usuario_cliente');

//----app------
const app = express();

//---- Rutas Publicas ------
app.use('/',
	suscripcion,
	//---- Tablas Basicas ----
	usuario,
	cliente,
	empresa,
	parametro,
	perfil,
	abogado_servicio,
	actuacion,
	tipo_parametro,
	categoria_servicio,
	conocenos_web,
	correos,
	servicio,
	consejo,
	bloque_hora,
	empleado,
	difusion,
	canal_escucha,
	red_social,
	imagen,
	filosofia,
	incidencia,
	caracteristica,
	caracteristica_base,
	imagen_carrusel,
	inicio_web,
	titulo_seccion,
	promocion,
	calificacion_orden,
	calificacion_servicio,
	tipo_servicio,
	rol,
	ruta,
	funcion,
	rol_funcion,
	objetivo,
	tipo_cliente,
	tipo_sugerencia,
	contacto_negocio,
	descripcion_negocio,
	agenda,
	auditoria,
	sugerencia,
	bloque,
	tipo_respuesta,
	estado_civil,
	pais,
	categoria_parametro,
	ciudad,
	comentario,
	criterio,
	valor_parametro,
	especialidad,
	sistema,
	estado,
	detalle_consejo,
	detalle_promocion,
	detalle_proveedor,
	detalle_servicio,
	dia_laborable,
	dia_semana,
	dispositivo,
	documento,
	empleado_asignado,
	solicitud,
	solicitud_rechazo,
	orden_servicio,
	servicio_solicitado,
	garantia,
	respuesta_solicitud,
	reclamo,
	tipo_reclamo,
	respuesta_sugerencia,
	respuesta_reclamo,
	horario,
	horario_empleado,
	incidencia_orden,
	incidencia_servicio,
	insumo,
	insumo_asociado,
	insumo_usado,
	notificacion,
	presupuesto,
	recaudo_servicio,
	proveedor,
	tipo_garantia,
	razon_incidencia,
	respuesta_incidencia,
	servicio_parametro,
	tipo_comentario,
	tipo_incidencia,
	tipo_empleado,
	tipo_notificacion,
	tipo_respuesta_comentario,
	tipo_respuesta_presupuesto,
	tipo_respuesta_reclamo,
	tipo_respuesta_solicitud,
	unidad,
	cita,
	acceso_rol,
	actuacion_catalogo,
	actuacion_servicio,
	catalogo_servicio,
	categoria_servicio,
	categoria,
	recaudo_catalogo,
	promocion,
	rango_valoracion,
    tipo_actuacion,
	tipo_documento,
	tipo_valoracion,
	tipo_valoracion_rango_valoracion,
	valoracion,
	valoracion_catalogo,
	//---- Gestiones ----
	gestion_solicitud,
	gestion_tipo_parametro,
	gestion_promocion,
	gestion_servicio,
	gestion_consejo,
	gestion_calificacion,
	//---- Vistas ----
	vista_comentario,
	vista_abogado,
	vista_actuacion_catalogo,
	vista_recaudo_servicio,
	vista_recaudo_catalogo,
	vista_solicitud,
	vista_servicio,
	vista_reclamo,
	vista_respuesta_presupuesto,
	vista_respuesta_solicitud,
	vista_servicio_categoria,
	vista_empleados_categoria,
	vista_especialidad,
	vista_caracteristica,
	vista_cliente_consejo,
	vista_cliente_servicio,
	vista_cliente_promocion,
	vista_detalle_servicios_true,
	vista_perfil,
	vista_presupuesto,
	vista_orden,
	vista_cita,
	vista_cliente_comentario,
	vista_cliente_perfil,
	vista_cliente_reclamo,
	vista_cliente_solicitud,
	vista_cliente_abogado,
	vista_agendas,
	vista_agenda,
	vista_detalle_consejo,
	vista_detalle_promocion,
	vista_sugerencia,
	vista_servicio_abogado,
	vista_todas_promociones,
	vista_red_social_empleado,
	vista_todos_consejos,
	vista_todos_servicios,
	vista_calificacion_orden,
	vista_detalle_proveedor,
	vista_incidencia_de_orden,
	vista_insumo_asociados,
	vista_insumos,
	vista_incidencia,
	vista_horario,
	vista_roles,
	vista_empleado,
	vista_servicio_con_incidencia,
	vista_servicios_calificados,
	vista_servicios_con_garantia,
	vista_todos_servicio_garantia,
	vista_servicio_solicitud,
	vista_solicitud_insumo,
	vista_solicitud_rechazada,
	vista_orden_cita,
	vista_tr_valoracion,
	usuario_cliente,
	vista_usuario,
	vista_valoracion,
	//-------REPORTES
	reporte_incidencia,
	reporte_promocion,
	reporte_reclamo,
	reporte_servicio,
	reporte_solicitud,
	reporte_sugerencia,
	//-------ESTADISTICOS
	estadistico_servicio,
	estadistico_promocion,
	estadistico_sugerencia,
	estadistico_incidencia,
	estadistico_incidencia2,
	estadistico_reclamo,
);

//---- Rutas Privadas ------
// app.use('/',auth,

// );

//----Exportar Rutas------ 
module.exports = app