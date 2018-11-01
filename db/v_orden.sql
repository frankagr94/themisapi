CREATE VIEW v_orden AS
 SELECT a.id,
        a.id_solicitud,
        a.estado,
        a.estatus,
        b.id AS solicitud,
        b.id_cliente,
        b.estado AS estado_s,
        c.id AS cliente,
        c.nombre,
        c.apellido
   FROM orden_servicio a
     JOIN solicitud b ON a.id_solicitud = b.id
     JOIN cliente c ON c.id = b.id_cliente
  WHERE a.estatus = 'A'::bpchar;