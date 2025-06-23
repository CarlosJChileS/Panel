
-- Tabla adicional de usuarios vinculada a auth.users
CREATE TABLE IF NOT EXISTS public.usuario (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE
);
-- Historial de consultas realizadas por los usuarios
CREATE TABLE IF NOT EXISTS public.historial (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.usuario(id),
  ciudad text NOT NULL,
  fecha timestamp with time zone DEFAULT now()
);
