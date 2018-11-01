CREATE VIEW v_calificacion_orden AS
SELECT a.id,
       a.id_criterio,
       a.id_orden_servicio,
       a.puntuacion,
       a.fecha_creacion,
       a.estatus,

       b.id AS criterio,
       b.nombre

       FROM calificacion_orden a
       JOIN criterio b ON b.id= a.id_criterio
       WHERE a.estatus='A'::bpchar