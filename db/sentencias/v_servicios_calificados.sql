CREATE VIEW v_servicios_calificados AS
SELECT a.id AS detalle_servicio,
       a.id_orden_servicio,
       a.id_servicio_solicitado,
       a.fecha_creacion AS fecha_detalle,
       a.estatus AS a_estatus,
       a.realizacion,

       b.id AS servicio_solicitado,
       b.id_solicitud AS ss_solicitud,
       b.id_servicio,
       b.fecha_creacion AS fecha_servicio_solicitado,
       b.estatus AS estatus_servicio_solicitado,
       
       c.id AS servicio,
       c.imagen,
       c.descripcion,
       c.id_tipo_servicio,
       d.nombre AS el_tipo,
       c.nombre AS nombre_servicio,

       g.id AS calificacion,
       g.puntuacion,

       d.id AS tipo_servicio,
       d.id_categoria_servicio,

       e.id AS categoria_servicio,
       e.nombre AS la_categoria,

       f.id AS orden_servicio,
       f.id_solicitud AS os_solicitud,
       f.estado AS estado_orden

       FROM detalle_servicio a
       JOIN servicio_solicitado b ON b.id = a.id_servicio_solicitado
       JOIN orden_servicio f ON f.id = a.id_orden_servicio
        
       JOIN servicio c ON c.id = b.id_servicio
       JOIN tipo_servicio d ON d.id = c.id_tipo_servicio
       JOIN categoria_servicio e ON e.id = d.id_categoria_servicio
       JOIN calificacion_servicio g ON g.id_detalle_servicio = a.id
       WHERE  a.estatus='A'::bpchar AND a.realizacion=TRUE AND f.estado= 'R' 