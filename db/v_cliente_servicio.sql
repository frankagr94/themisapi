CREATE VIEW v_cliente_servicio AS
SELECT  a.id,
	a.imagen,
	a.nombre,
	a.descripcion,
	a.precio,
	a.duracion,
	a.fecha_creacion,
	a.estatus,
	b.id_servicio AS servicio_parametro,
        b.id_valor_parametro,
        c.id AS valor_parametro,
        c.nombre AS nombre_valor,
        d.id AS perfil,
        e.id AS cliente,
        e.nombre AS nombre_cliente,
        e.apellido
     FROM servicio a
     JOIN servicio_parametro b ON b.id_servicio = a.id
     JOIN valor_parametro c ON c.id = b.id_valor_parametro
     JOIN perfil d ON d.id_valor_parametro = b.id_valor_parametro
     JOIN cliente e ON e.id = d.id_cliente
  WHERE a.estatus = 'A'::bpchar;