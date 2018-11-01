-- View: public.vista_servicio_solicitud

-- DROP VIEW public.vista_servicio_solicitud;

CREATE OR REPLACE VIEW public.vista_servicio_solicitud AS 
 SELECT a.id,
    b.id AS id_servicio_solicitado,
    d.id AS id_solicitud,
    a.nombre AS nombre_servicio,
    c.nombre AS tipo_servicio
   FROM servicio a
     JOIN servicio_solicitado b ON a.id = b.id_servicio
     JOIN solicitud d ON d.id = b.id_solicitud
     JOIN tipo_servicio c ON c.id = a.id_tipo_servicio
  WHERE a.estatus = 'A'::bpchar;

ALTER TABLE public.vista_servicio_solicitud
  OWNER TO postgres;
