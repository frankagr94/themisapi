CREATE VIEW v_roles AS
SELECT a.id,
       a.nombre,
       ARRAY (SELECT b.id FROM funcion b 
        JOIN rol_funcion c ON c.id_funcion = b.id
        WHERE a.id=c.id_rol AND b.estatus='A'::bpchar ) AS funciones
        FROM rol a
        WHERE a.estatus='A'::bpchar
     
       