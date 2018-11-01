CREATE VIEW v_cliente_consejo AS
SELECT  a.id,
	a.titulo,
	a.descripcion,
	a.imagen,
	a.autor,
	a.fecha_creacion,
	a.estatus,
	b.id_consejo AS detalle_consejo,
        b.id_valor_parametro,
        c.id AS valor_parametro,
        c.nombre AS nombre_valor,
        d.id AS perfil,
        e.id AS cliente,
        e.nombre AS nombre_cliente,
        e.apellido
     FROM consejo a
     JOIN detalle_consejo b ON b.id_consejo = a.id
     JOIN valor_parametro c ON c.id = b.id_valor_parametro
     JOIN perfil d ON d.id_valor_parametro = b.id_valor_parametro
     JOIN cliente e ON e.id = d.id_cliente
  WHERE a.estatus = 'A'::bpchar;