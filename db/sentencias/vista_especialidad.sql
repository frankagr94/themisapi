-- View: public.vista_especialidad

-- DROP VIEW public.vista_especialidad;

CREATE OR REPLACE VIEW public.vista_especialidad AS 
 SELECT a.id,
    a.id_empleado,
    a.id_categoria_servicio,
    b.nombre,
    b.apellido,
    b.cedula,
    b.telefono,
    b.direccion,
    b.fecha_nacimiento,
    b.sexo
   FROM especialidad a
     JOIN empleado b ON a.id_empleado = b.id
  WHERE a.estatus = 'A'::bpchar;

ALTER TABLE public.vista_especialidad
  OWNER TO postgres;
