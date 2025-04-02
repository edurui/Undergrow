-- Establecer el esquema por defecto
SET search_path TO db_undergrow;

-- Inserción de disciplinas artísticas
INSERT INTO "discipline" ("name") VALUES 
('Graffiti'),
('Música'),
('Danza'),
('Cine'),
('Teatro'),
('Fotografía'),
('Pintura'),
('Escultura'),
('Literatura'),
('Arte Digital');

-- Inserción de usuarios
INSERT INTO "user" ("name", "surname", "mail", "password_hash", "validated", "verified", "birth_date", "create_date")
VALUES 
('María', 'González', 'maria.gonzalez@mail.com', '$2a$12$aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789ABCDEFGHIJK', true, true, '1990-05-15', '2024-03-01 10:30:00'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@mail.com', '$2a$12$bCdEfGhIjKlMnOpQrStUvWxYz987654321ABCDEFGHIJKL', true, true, '1988-11-22', '2024-03-02 14:45:00'),
('Laura', 'Sánchez', 'laura.sanchez@mail.com', '$2a$12$cDeFgHiJkLmNoPqRsTuVwXyZ123456789MNOPQRSTUVWXYZ', true, false, '1995-07-08', '2024-03-03 09:15:00'),
('Javier', 'López', 'javier.lopez@mail.com', '$2a$12$dEfGhIjKlMnOpQrStUvWxYz987654321MNOPQRSTUVWXYZ', true, true, '1992-03-27', '2024-03-04 16:20:00'),
('Ana', 'Martínez', 'ana.martinez@mail.com', '$2a$12$eFgHiJkLmNoPqRsTuVwXyZ123456789ZYXWVUTSRQPONM', true, true, '1987-12-10', '2024-03-05 11:50:00'),
('Miguel', 'Fernández', 'miguel.fernandez@mail.com', '$2a$12$fGhIjKlMnOpQrStUvWxYz987654321ZYXWVUTSRQPONML', false, false, '1993-09-18', '2024-03-06 08:25:00'),
('Elena', 'García', 'elena.garcia@mail.com', '$2a$12$gHiJkLmNoPqRsTuVwXyZ123456789LKJIHGFEDCBA9876', true, true, '1991-02-03', '2024-03-07 13:40:00'),
('David', 'Pérez', 'david.perez@mail.com', '$2a$12$hIjKlMnOpQrStUvWxYz987654321LKJIHGFEDCBA98765', true, true, '1989-06-14', '2024-03-08 15:10:00'),
('Lucía', 'Díaz', 'lucia.diaz@mail.com', '$2a$12$iJkLmNoPqRsTuVwXyZ123456789ABCDEFGHIJKLMNOPQRS', true, false, '1994-04-25', '2024-03-09 10:05:00'),
('Pablo', 'Ruiz', 'pablo.ruiz@mail.com', '$2a$12$jKlMnOpQrStUvWxYz987654321ABCDEFGHIJKLMNOPQRST', true, true, '1986-08-30', '2024-03-10 17:35:00');

-- Inserción de perfiles
INSERT INTO "profile" ("user_name", "photo", "description", "create_date", "id_user", "id_discipline")
VALUES 
('urban_maria', 'profile_pics/maria.jpg', 'Artista urbana apasionada por el color', '2024-03-01 11:00:00', 1, 1),
('carlos_beats', 'profile_pics/carlos.jpg', 'Productor musical y DJ', '2024-03-02 15:00:00', 2, 2),
('laura_dances', 'profile_pics/laura.jpg', 'Bailarina contemporánea', '2024-03-03 09:30:00', 3, 3),
('javi_films', 'profile_pics/javier.jpg', 'Director de cine independiente', '2024-03-04 16:45:00', 4, 4),
('ana_stage', 'profile_pics/ana.jpg', 'Actriz y directora teatral', '2024-03-05 12:15:00', 5, 5),
('miguel_lens', 'profile_pics/miguel.jpg', 'Fotógrafo de paisajes urbanos', '2024-03-06 08:45:00', 6, 6),
('elena_canvas', 'profile_pics/elena.jpg', 'Pintora abstracta', '2024-03-07 14:00:00', 7, 7),
('david_sculpts', 'profile_pics/david.jpg', 'Escultor de materiales reciclados', '2024-03-08 15:30:00', 8, 8),
('lucia_words', 'profile_pics/lucia.jpg', 'Poeta y escritora de microrelatos', '2024-03-09 10:30:00', 9, 9),
('pablo_pixel', 'profile_pics/pablo.jpg', 'Artista digital y diseñador', '2024-03-10 18:00:00', 10, 10);

-- Inserción de filtros
INSERT INTO "filter" ("name", "id_discipline")
VALUES 
('Street Art', 1),
('Mural', 1),
('Stencil', 1),
('Hip Hop', 2),
('Electrónica', 2),
('Jazz', 2),
('Contemporánea', 3),
('Urbana', 3),
('Clásica', 3),
('Cortometraje', 4),
('Documental', 4),
('Experimental', 4),
('Drama', 5),
('Comedia', 5),
('Performance', 5),
('Retrato', 6),
('Urbana', 6),
('Naturaleza', 6),
('Óleo', 7),
('Acuarela', 7),
('Abstracto', 7),
('Metal', 8),
('Madera', 8),
('Cerámica', 8),
('Poesía', 9),
('Relato corto', 9),
('Novela', 9),
('Animación 3D', 10),
('Diseño web', 10),
('NFT', 10);

-- Inserción de posts
INSERT INTO "post" ("description", "create_date", "id_user")
VALUES 
('Mi último mural en el festival de arte urbano', '2024-03-15 14:30:00', 1),
('Nueva composición electrónica, feedback bienvenido', '2024-03-16 18:45:00', 2),
('Ensayo para la próxima competición', '2024-03-17 10:20:00', 3),
('Backstage de mi nuevo cortometraje', '2024-03-18 16:10:00', 4),
('Escena final de mi obra "Sombras"', '2024-03-19 20:30:00', 5),
('Serie urbana: "Luces de ciudad"', '2024-03-20 09:15:00', 6),
('Mi exposición "Colores del alma" abre mañana', '2024-03-21 13:40:00', 7),
('Nueva pieza terminada: "Metamorfosis"', '2024-03-22 11:25:00', 8),
('Compartiendo mi último poema visual', '2024-03-23 17:50:00', 9),
('Proyecto de realidad aumentada finalizado', '2024-03-24 15:05:00', 10);

-- Inserción de multimedia
INSERT INTO "multimedia" ("file_url", "file_type", "id_post")
VALUES 
('uploads/mural_festival.jpg', 'image/jpeg', 1),
('uploads/mural_detail.jpg', 'image/jpeg', 1),
('uploads/electronic_track.mp3', 'audio/mpeg', 2),
('uploads/dance_rehearsal.mp4', 'video/mp4', 3),
('uploads/dance_photo.jpg', 'image/jpeg', 3),
('uploads/film_backstage.jpg', 'image/jpeg', 4),
('uploads/short_film_teaser.mp4', 'video/mp4', 4),
('uploads/theater_scene.jpg', 'image/jpeg', 5),
('uploads/city_lights_1.jpg', 'image/jpeg', 6),
('uploads/city_lights_2.jpg', 'image/jpeg', 6),
('uploads/city_lights_3.jpg', 'image/jpeg', 6),
('uploads/exhibition_preview.jpg', 'image/jpeg', 7),
('uploads/sculpture_metamorphosis.jpg', 'image/jpeg', 8),
('uploads/visual_poem.jpg', 'image/jpeg', 9),
('uploads/ar_project.mp4', 'video/mp4', 10);

-- Inserción de likes
INSERT INTO "liked_post" ("create_date", "id_post", "id_user")
VALUES 
('2024-03-15 15:10:00', 1, 2),
('2024-03-15 15:25:00', 1, 3),
('2024-03-15 16:40:00', 1, 5),
('2024-03-16 19:20:00', 2, 1),
('2024-03-16 19:35:00', 2, 4),
('2024-03-17 11:05:00', 3, 5),
('2024-03-17 11:30:00', 3, 7),
('2024-03-18 16:50:00', 4, 3),
('2024-03-18 17:15:00', 4, 9),
('2024-03-19 21:10:00', 5, 4),
('2024-03-19 21:45:00', 5, 8),
('2024-03-20 10:00:00', 6, 1),
('2024-03-20 10:20:00', 6, 10),
('2024-03-21 14:25:00', 7, 6),
('2024-03-21 14:50:00', 7, 9),
('2024-03-22 12:15:00', 8, 7),
('2024-03-22 12:40:00', 8, 10),
('2024-03-23 18:30:00', 9, 2),
('2024-03-23 18:55:00', 9, 8),
('2024-03-24 15:45:00', 10, 1),
('2024-03-24 16:10:00', 10, 6);

-- Inserción de comentarios
INSERT INTO "comment_post" ("description", "create_date", "id_post", "id_user")
VALUES 
('¡Me encanta el uso del color! ¿Qué técnica usaste?', '2024-03-15 15:15:00', 1, 2),
('Increíble trabajo, las texturas son fantásticas', '2024-03-15 16:20:00', 1, 5),
('Ese bajo suena genial, ¿qué equipo usas para producir?', '2024-03-16 19:25:00', 2, 1),
('La coreografía es impresionante, ¿cuánto tiempo ensayaste?', '2024-03-17 11:10:00', 3, 5),
('Me encanta la iluminación que elegiste para las tomas', '2024-03-18 17:00:00', 4, 3),
('La actuación es conmovedora, felicidades al elenco', '2024-03-19 21:15:00', 5, 4),
('La serie completa tiene una coherencia visual única', '2024-03-20 10:05:00', 6, 1),
('No puedo esperar para ver la exposición completa', '2024-03-21 14:30:00', 7, 6),
('El material que usaste le da un carácter especial', '2024-03-22 12:20:00', 8, 7),
('La metáfora visual es muy potente, me conmovió', '2024-03-23 18:35:00', 9, 2),
('¿Qué software utilizaste para la parte de AR?', '2024-03-24 15:50:00', 10, 1);

-- Inserción de posts guardados
INSERT INTO "saved_post" ("create_date", "id_post", "id_user")
VALUES 
('2024-03-15 16:30:00', 1, 3),
('2024-03-15 17:45:00', 1, 7),
('2024-03-16 20:15:00', 2, 5),
('2024-03-16 21:30:00', 2, 9),
('2024-03-17 12:20:00', 3, 2),
('2024-03-17 13:40:00', 3, 10),
('2024-03-18 18:05:00', 4, 1),
('2024-03-18 19:25:00', 4, 7),
('2024-03-19 22:10:00', 5, 6),
('2024-03-19 23:30:00', 5, 10),
('2024-03-20 11:15:00', 6, 4),
('2024-03-20 12:35:00', 6, 8),
('2024-03-21 15:40:00', 7, 3),
('2024-03-21 16:55:00', 7, 5),
('2024-03-22 13:25:00', 8, 2),
('2024-03-22 14:45:00', 8, 9),
('2024-03-23 19:30:00', 9, 4),
('2024-03-23 20:50:00', 9, 6),
('2024-03-24 17:05:00', 10, 3),
('2024-03-24 18:25:00', 10, 8);