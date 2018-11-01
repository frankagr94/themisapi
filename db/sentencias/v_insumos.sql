CREATE VIEW v_insumos AS
SELECT a.id,
       b.nombre AS tipo_insumo,
       a.nombre,
       a.id_tipo_insumo,
       a.cantidad,
       c.nombre AS unidad,
       a.id_unidad
       FROM insumo a
       JOIN tipo_insumo b ON b.id= a.id_tipo_insumo
       JOIN unidad c ON c.id = a.id_unidad
       WHERE a.estatus='A'::bpchar
       
       
       
       
       
       
       