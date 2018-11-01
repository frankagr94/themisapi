CREATE VIEW v_todos_servicio_garantia AS
 SELECT a.id,
    b.nombre AS tipo_servicio,
    a.nombre,
    a.imagen,
    a.precio,
    a.descripcion,
    c.nombre AS categoria_servicio,
    d.id AS garantia,
    d.cantidad_dias,
    d.descripcion AS desc_garantia,
    d.id_servicio
   FROM servicio a
     JOIN tipo_servicio b ON b.id = a.id_tipo_servicio
     JOIN categoria_servicio c ON c.id = b.id_categoria_servicio
     JOIN garantia d ON d.id_servicio = a.id
  WHERE a.estatus = 'A'::bpchar;
