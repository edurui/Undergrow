-- Eliminar tablas si existen en orden inverso (para evitar errores de referencias)
DROP TABLE IF EXISTS "saved_post" CASCADE;
DROP TABLE IF EXISTS "liked_post" CASCADE;
DROP TABLE IF EXISTS "comment_post" CASCADE;
DROP TABLE IF EXISTS "multimedia" CASCADE;
DROP TABLE IF EXISTS "post" CASCADE;
DROP TABLE IF EXISTS "filter" CASCADE;
DROP TABLE IF EXISTS "profile" CASCADE;
DROP TABLE IF EXISTS "discipline" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Tabla "user"
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    mail VARCHAR(100) NOT NULL UNIQUE,  -- Añadida restricción UNIQUE
    password_hash VARCHAR(255) NOT NULL, -- Añadido campo para contraseña
    validated BOOLEAN NOT NULL, -- Validación de correo
    verified BOOLEAN NOT NULL, -- Verificación de DNI
    birth_date DATE NOT NULL,
    create_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    remove_date TIMESTAMP(6),
    last_login_date TIMESTAMP(6)  -- Añadido último login
);

-- Crear índice para búsquedas por email
CREATE INDEX idx_user_mail ON "user"(mail);

-- Tabla "discipline"
CREATE TABLE "discipline" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT  -- Añadida descripción de la disciplina
);

-- Tabla "profile"
CREATE TABLE "profile" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL UNIQUE,  -- Añadida restricción UNIQUE
    photo VARCHAR(255),  -- Ampliada longitud para URLs
    description TEXT,    -- Cambiado a TEXT para descripciones más largas
    create_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(100),  -- Añadida ubicación
    website VARCHAR(255),   -- Añadido sitio web
    id_user INTEGER NOT NULL UNIQUE,  -- Un usuario solo puede tener un perfil
    id_discipline INTEGER,
    FOREIGN KEY (id_user) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (id_discipline) REFERENCES "discipline"(id) ON DELETE SET NULL
);

-- Crear índice para búsquedas por nombre de usuario
CREATE INDEX idx_profile_username ON "profile"(user_name);

-- Tabla "filter"
CREATE TABLE "filter" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    id_discipline INTEGER NOT NULL,
    FOREIGN KEY (id_discipline) REFERENCES "discipline"(id) ON DELETE CASCADE,
    UNIQUE(name, id_discipline)  -- Un filtro debe ser único para una disciplina
);

-- Tabla "post"
CREATE TABLE "post" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),  -- Añadido título
    description TEXT,    -- Cambiado a TEXT para descripciones más largas
    create_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    remove_date TIMESTAMP(6),
    id_user INTEGER NOT NULL,
    id_discipline INTEGER NOT NULL,  -- Añadida relación directa con disciplina
    FOREIGN KEY (id_user) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (id_discipline) REFERENCES "discipline"(id) ON DELETE RESTRICT
);


-- Tabla "multimedia"
CREATE TABLE "multimedia" (
    id SERIAL PRIMARY KEY,
    file_url VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER NOT NULL,  -- Añadido tamaño del archivo
    create_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_post INTEGER NOT NULL,
    FOREIGN KEY (id_post) REFERENCES "post"(id) ON DELETE CASCADE,
    );

-- Índice para búsqueda rápida de archivos multimedia por post
CREATE INDEX idx_multimedia_post ON "multimedia"(id_post);

-- Tabla "comment_post"
CREATE TABLE "comment_post" (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,  -- Cambiado a TEXT
    create_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    edit_date TIMESTAMP(6),  -- Fecha de edición
    id_post INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    parent_comment_id INTEGER,  -- Para comentarios anidados
    FOREIGN KEY (id_post) REFERENCES "post"(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES "comment_post"(id) ON DELETE CASCADE
);

-- Índices para comentarios
CREATE INDEX idx_comment_post ON "comment_post"(id_post);
CREATE INDEX idx_comment_user ON "comment_post"(id_user);
CREATE INDEX idx_comment_parent ON "comment_post"(parent_comment_id);

-- Tabla "liked_post"
CREATE TABLE "liked_post" (
    id SERIAL PRIMARY KEY,
    create_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_post INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_post) REFERENCES "post"(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES "user"(id) ON DELETE CASCADE,
    UNIQUE(id_post, id_user)  -- Un usuario solo puede dar like una vez por post
);

-- Índices para likes
CREATE INDEX idx_liked_post ON "liked_post"(id_post);
CREATE INDEX idx_liked_user ON "liked_post"(id_user);

-- Tabla "saved_post"
CREATE TABLE "saved_post" (
    id SERIAL PRIMARY KEY,
    create_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_post INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_post) REFERENCES "post"(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES "user"(id) ON DELETE CASCADE,
    UNIQUE(id_post, id_user)  -- Un usuario solo puede guardar un post una vez
);

-- Índices para posts guardados
CREATE INDEX idx_saved_post ON "saved_post"(id_post);
CREATE INDEX idx_saved_user ON "saved_post"(id_user);

