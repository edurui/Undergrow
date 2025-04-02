-- Establecer el esquema por defecto
SET search_path TO db_undergrow;

-- Drop tables en orden adecuado (respetando las dependencias)
DROP TABLE IF EXISTS "multimedia";
DROP TABLE IF EXISTS "liked_post";
DROP TABLE IF EXISTS "comment_post";
DROP TABLE IF EXISTS "saved_post";
DROP TABLE IF EXISTS "post";
DROP TABLE IF EXISTS "profile";
DROP TABLE IF EXISTS "filter";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "discipline";

-- Creación de tablas
CREATE TABLE "discipline" (
    "id" serial PRIMARY KEY,
    "name" varchar(100) NOT NULL
);

CREATE TABLE "user" (
    "id" serial PRIMARY KEY,
    "name" varchar(100) NOT NULL,
    "surname" varchar(100) NOT NULL,
    "mail" varchar(100) NOT NULL UNIQUE,
    "password_hash" varchar(255) NOT NULL,
    "validated" boolean NOT NULL,
    "verified" boolean NOT NULL,
    "birth_date" date NOT NULL,
    "create_date" timestamp NOT NULL,
    "remove_date" timestamp NULL
);

CREATE TABLE "filter" (
    "id" serial PRIMARY KEY,
    "name" varchar(100) NOT NULL,
    "id_discipline" integer NOT NULL,
    CONSTRAINT "filter_id_discipline_fkey" FOREIGN KEY ("id_discipline") REFERENCES "discipline"("id")
);

CREATE TABLE "post" (
    "id" serial PRIMARY KEY,
    "description" varchar(100) NULL,
    "create_date" timestamp NOT NULL,
    "remove_date" timestamp NULL,
    "id_user" integer NOT NULL,
    CONSTRAINT "post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id")
);

CREATE TABLE "profile" (
    "id" serial PRIMARY KEY,
    "user_name" varchar(100) NOT NULL UNIQUE,
    "photo" varchar(100) NULL,
    "description" varchar(100) NULL,
    "create_date" timestamp NOT NULL,
    "id_user" integer NOT NULL,
    "id_discipline" integer NULL,
    CONSTRAINT "profile_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id"),
    CONSTRAINT "profile_id_discipline_fkey" FOREIGN KEY ("id_discipline") REFERENCES "discipline"("id")
);

CREATE TABLE "saved_post" (
    "id" serial PRIMARY KEY,
    "create_date" timestamp NOT NULL,
    "id_post" integer NOT NULL,
    "id_user" integer NOT NULL,
    CONSTRAINT "saved_post_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id"),
    CONSTRAINT "saved_post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id")
);

CREATE TABLE "comment_post" (
    "id" serial PRIMARY KEY,
    "description" varchar(100) NOT NULL,
    "create_date" timestamp NOT NULL,
    "id_post" integer NOT NULL,
    "id_user" integer NOT NULL,
    CONSTRAINT "comment_post_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id"),
    CONSTRAINT "comment_post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id")
);

CREATE TABLE "liked_post" (
    "id" serial PRIMARY KEY,
    "create_date" timestamp NOT NULL,
    "id_post" integer NOT NULL,
    "id_user" integer NOT NULL,
    CONSTRAINT "liked_post_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id"),
    CONSTRAINT "liked_post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id")
);

CREATE TABLE "multimedia" (
    "id" serial PRIMARY KEY,
    "file_url" varchar(255) NOT NULL,
    "file_type" varchar(50) NOT NULL,
    "id_post" integer NOT NULL,
    CONSTRAINT "multimedia_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id")
);