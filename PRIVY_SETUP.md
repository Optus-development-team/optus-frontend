# Configuración de Privy en OPTUS

## 🔐 Autenticación con Privy

Este proyecto usa **Privy** para la autenticación de usuarios. Privy proporciona:
- Login con Email (sin contraseña, mediante código OTP)
- Login con Google
- Login con Apple
- Login con Facebook (opcional)
- Wallets embebidas para usuarios

## 📋 Pasos para Configurar Privy

### 1. Crear una cuenta en Privy
1. Ve a [https://dashboard.privy.io](https://dashboard.privy.io)
2. Crea una cuenta gratuita
3. Crea una nueva aplicación

### 2. Obtener tu App ID
1. En el dashboard de Privy, ve a "Settings" > "Basics"
2. Copia tu **App ID**
3. Pégalo en el archivo `.env`:
   ```
   PRIVY_APP_ID=tu_app_id_aqui
   ```

### 3. Configurar métodos de Login
En el dashboard de Privy:
1. Ve a "Login Methods"
2. Habilita los métodos que desees:
   - ✅ Email (recomendado)
   - ✅ Google
   - ✅ Apple
   - ⚪ Facebook (opcional)

### 4. Configurar URLs permitidas
En "Settings" > "URLs":
1. Agrega `http://localhost:5173` para desarrollo
2. Agrega tu dominio de producción cuando lo tengas

## 🎨 Personalización

En `src/App.jsx` puedes personalizar:

```javascript
<PrivyProvider
  appId={import.meta.env.PRIVY_APP_ID}
  config={{
    loginMethods: ['email', 'google', 'apple'], // Métodos habilitados
    appearance: {
      theme: 'light',
      accentColor: '#66AFFF', // Color de OPTUS
      logo: '/OPTUSLOGO.png', // Logo de OPTUS
    },
    embeddedWallets: {
      createOnLogin: 'users-without-wallets',
    },
  }}
>
```

## 🔗 Conectar con Base de Datos

Para conectar Privy con tu base de datos:

### Opción 1: Webhooks (Recomendado)
1. En Privy Dashboard > "Webhooks"
2. Configura un endpoint en tu backend (ej: `https://tu-api.com/webhooks/privy`)
3. Recibe eventos como:
   - `user.created` - Usuario nuevo registrado
   - `user.authenticated` - Usuario inició sesión
   - `user.linked_account` - Usuario conectó una cuenta social

### Opción 2: API de Privy
Usa la API de Privy para obtener información del usuario:
```javascript
import { usePrivy } from '@privy-io/react-auth';

const { user, authenticated } = usePrivy();

// Envía datos a tu backend
if (authenticated && user) {
  fetch('https://tu-api.com/users/sync', {
    method: 'POST',
    body: JSON.stringify({
      privyId: user.id,
      email: user.email?.address,
      linkedAccounts: user.linkedAccounts,
    }),
  });
}
```

## 📦 Estructura de Datos del Usuario

Cuando un usuario inicia sesión con Privy, recibes:

```javascript
{
  id: "did:privy:cm67...", // ID único del usuario
  email: {
    address: "usuario@ejemplo.com"
  },
  linkedAccounts: [
    {
      type: "google_oauth",
      email: "usuario@gmail.com",
      name: "Juan Pérez",
      picture: "https://..."
    }
  ],
  createdAt: 1701234567890
}
```

## 🚀 Uso en el Código

### Verificar si está autenticado
```javascript
import { usePrivy } from '@privy-io/react-auth';

function MiComponente() {
  const { authenticated, user } = usePrivy();
  
  if (authenticated) {
    return <div>Bienvenido {user.email?.address}</div>;
  }
  
  return <div>No autenticado</div>;
}
```

### Abrir modal de login
```javascript
const { login } = usePrivy();

<button onClick={login}>Iniciar Sesión</button>
```

### Cerrar sesión
```javascript
const { logout } = usePrivy();

<button onClick={logout}>Cerrar Sesión</button>
```

## 🔒 Seguridad

Privy maneja:
- ✅ Autenticación segura
- ✅ Tokens JWT
- ✅ Sesiones persistentes
- ✅ Protección CSRF
- ✅ 2FA opcional

## 📚 Documentación

- [Privy Docs](https://docs.privy.io)
- [React SDK](https://docs.privy.io/guide/react)
- [API Reference](https://docs.privy.io/reference/api)

## ❓ Soporte

Si tienes problemas:
1. Verifica que el App ID esté correcto en `.env`
2. Revisa que los métodos de login estén habilitados en Privy Dashboard
3. Consulta los logs de la consola del navegador
4. Revisa la [documentación de Privy](https://docs.privy.io)
