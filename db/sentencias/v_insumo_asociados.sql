CREATE VIEW v_insumo_asociados AS
SELECT a.id AS insumo_asociado,
       a.id_insumo,
       a.id_servicio,

       b.id,
       c.nombre AS tipo_insumo,
       b.nombre,
       b.id_tipo_insumo,
       b.cantidad,
       d.nombre AS unidad,
       b.id_unidad
       FROM insumo_asociado a
       JOIN insumo b ON b.id = a.id_insumo
       JOIN tipo_insumo c ON c.id= b.id_tipo_insumo
       JOIN unidad d ON d.id = b.id_unidad
       WHERE a.estatus='A'::bpchar