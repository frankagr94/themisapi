CREATE VIEW v_detalle_proveedor AS
SELECT a.id AS detalle_proveedor,
       a.id_proveedor,
       a.id_insumo,
       b.id,
       b.nombre AS tipo_insumo,
       c.nombre,
       c.id_tipo_insumo,
       c.cantidad,
       d.nombre AS unidad,
       c.id_unidad
       FROM detalle_proveedor a
       JOIN insumo c ON c.id = a.id_insumo
       JOIN tipo_insumo b ON b.id= c.id_tipo_insumo
       JOIN unidad d ON d.id = c.id_unidad
       WHERE a.estatus='A'::bpchar
       