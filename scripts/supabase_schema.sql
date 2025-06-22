-- Tabla de usuarios gestionada por el módulo de autenticación de Supabase
-- Tabla para almacenar historial de consultas realizadas en el dashboard
CREATE TABLE IF NOT EXISTS public.historial (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  ciudad text NOT NULL,
  fecha timestamp with time zone DEFAULT now()
);
