# Configuración de RainbowKit y Wagmi

## 🚀 Configuración Inicial

### 1. Obtener WalletConnect Project ID

Para que RainbowKit funcione correctamente, necesitas un **Project ID de WalletConnect**:

1. Ve a [https://cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia tu **Project ID**
5. Agrégalo a tu archivo `.env`:

```env
WALLETCONNECT_PROJECT_ID=tu_project_id_aqui
```

### 2. Dependencias Instaladas

```bash
npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
```

## 📱 Características Implementadas

### Conexión de Wallet
- ✅ Botón de conexión personalizado con RainbowKit
- ✅ Soporte para múltiples wallets (MetaMask, WalletConnect, Coinbase, etc.)
- ✅ Muestra dirección de wallet conectada
- ✅ Muestra balance de la wallet
- ✅ Indicador visual de conexión activa
- ✅ Diseño personalizado con colores OPTUS

### Blockchains Soportadas
- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Base
- Binance Smart Chain

### Criptomonedas
- Bitcoin (BTC)
- USDT (Tether)
- Ethereum (ETH)

## 🎨 Personalización

### Tema RainbowKit
El tema está personalizado con los colores de OPTUS:

```javascript
theme={{
  lightMode: {
    accentColor: '#66AFFF',      // Color principal OPTUS
    accentColorForeground: 'white',
    borderRadius: 'large',
    fontStack: 'system',
  },
}}
```

### Cool Mode
Habilitado para efectos visuales interactivos al conectar wallet.

## 🔧 Uso en el Componente

```jsx
import { useAccount, useDisconnect, useBalance } from 'wagmi';

const { address, isConnected } = useAccount();
const { disconnect } = useDisconnect();
const { data: balance } = useBalance({ address });
```

## 📋 Próximos Pasos

1. **Obtener WalletConnect Project ID** y agregarlo al `.env`
2. **Conectar con Supabase**: Integrar las transacciones con la tabla `orders`
3. **Implementar lógica de pago**: Verificar transacciones on-chain
4. **Agregar notificaciones**: Toast notifications para feedback de acciones
5. **Generar códigos QR reales**: Usar librería como `qrcode.react`

## 🐛 Troubleshooting

### Error: "No Project ID provided"
- Asegúrate de tener `WALLETCONNECT_PROJECT_ID` en tu `.env`
- Reinicia el servidor de desarrollo después de agregar la variable

### Wallet no conecta
- Verifica que tengas una extensión de wallet instalada (MetaMask, etc.)
- Prueba con WalletConnect para wallets móviles

### Estilos no se aplican
- Verifica que `@rainbow-me/rainbowkit/styles.css` esté importado
- Limpia caché: `rm -rf node_modules/.vite`

## 📚 Recursos

- [RainbowKit Docs](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Docs](https://wagmi.sh)
- [WalletConnect Cloud](https://cloud.walletconnect.com)
- [Viem Docs](https://viem.sh)
