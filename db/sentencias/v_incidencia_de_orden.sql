CREATE VIEW v_incidencia_de_orden AS
SELECT a.id,
       a.id_orden_servicio,
       a.id_tipo_incidencia,
       a.fecha_creacion,
       a.estatus,

       b.id AS el_tipo,
       b.nombre AS tipo_incidencia,

       c.id AS la_razon,
       c.nombre AS razon_incidencia,
       c.descripcion

       FROM incidencia_orden a
       JOIN tipo_incidencia b ON b.id = a.id_tipo_incidencia
       JOIN razon_incidencia c ON c.id = b.id_razon_incidencia
       WHERE a.estatus='A'::bpchar
       