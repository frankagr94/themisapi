-- View: public.v_todas_promociones2

-- DROP VIEW public.v_todas_promociones2;

CREATE OR REPLACE VIEW public.v_todas_promociones AS 
 SELECT a.id,
    a.id_servicio,
    a.nombre,
    a.descripcion,
    a.porcentaje_descuento,
    a.precio_promocion,
    a.imagen,
    a.fecha_inicio,
    a.fecha_fin,
    a.estatus,
    a.fecha_creacion,
    a.estado,
    b.id AS el_id_servicio,
    (((c.nombre::text || ' '::text) || b.nombre::text) || ' '::text) || d.nombre::text AS servicios
   FROM promocion a
     JOIN servicio b ON b.id = a.id_servicio
     JOIN tipo_servicio c ON c.id = b.id_tipo_servicio
     JOIN categoria_servicio d ON d.id = c.id_categoria_servicio
  WHERE a.estatus = 'A'::bpchar;

ALTER TABLE public.v_todas_promociones2
  OWNER TO postgres;
