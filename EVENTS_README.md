# Events Dashboard

Esta es una página independiente trasladada desde el proyecto `live-sale-flow-main`. Funciona como un dashboard para monitorear procesos de backend en tiempo real.

## 🚀 Acceso

La página está disponible en: `http://localhost:5173/events`

**Nota:** Esta página NO está enlazada en el navbar principal. Es una página alterna independiente similar a `/pago/:codigoOrden`.

## 📁 Estructura de Archivos Creados

### Páginas
- `src/pages/Events.jsx` - Página principal del dashboard
- `src/pages/Events.css` - Estilos de la página

### Componentes Events
- `src/components/events/EventsHeader.jsx` - Header del dashboard
- `src/components/events/SimulateSaleCard.jsx` - Card para simular ventas
- `src/components/events/ProductsStockCard.jsx` - Card de productos y stock
- `src/components/events/ProcurementPaymentsCard.jsx` - Card de procurement y pagos
- `src/components/events/AuditTrailCard.jsx` - Card de historial de eventos

### Componentes UI
- `src/components/ui/button.jsx`
- `src/components/ui/card.jsx`
- `src/components/ui/badge.jsx`
- `src/components/ui/input.jsx`
- `src/components/ui/label.jsx`
- `src/components/ui/table.jsx`
- `src/components/ui/select.jsx`
- `src/components/ui/scroll-area.jsx`
- `src/components/ui/separator.jsx`

### Hooks
- `src/hooks/useDemoData.js` - Hook para manejar datos de productos, eventos y procurement
- `src/hooks/useOrderRun.js` - Hook para manejar el historial de órdenes
- `src/hooks/use-toast.js` - Hook simple para notificaciones

### Utilidades
- `src/utils/eventsSupabase.js` - Cliente de Supabase configurado para el proyecto live-sale
- `src/lib/utils.js` - Utilidades para className (cn function)

### Tipos
- `src/types/demo.js` - Tipos/constantes para datos del demo
- `src/types/runHistory.js` - Tipos/constantes para historial de ejecución

## 🔧 Dependencias Instaladas

```bash
npm install lucide-react date-fns clsx tailwind-merge
```

## 🗄️ Base de Datos

La página se conecta a la base de datos de Supabase del proyecto `live-sale-flow-main`:
- URL: `https://pxeqomxpuaabanziyyyu.supabase.co`
- Company ID: `6bff4e8e-c80c-4013-a663-191c18386b25`

## 📊 Funcionalidades

1. **Products & Stock**: Muestra productos disponibles con su stock actual y punto de reorden
2. **Simulate WhatsApp Sale**: Simula una venta de WhatsApp para testing
3. **Order Run History**: Muestra el historial completo de cada orden con todos sus pasos
4. **Procurement & Payments**: Monitorea solicitudes de procurement, órdenes de compra y pagos a proveedores

## 🔴 Real-time

Todos los componentes están suscritos a cambios en tiempo real de Supabase, por lo que se actualizan automáticamente cuando hay cambios en la base de datos.

## 🎯 Uso

1. Navega a `http://localhost:5173/events`
2. Verás el dashboard con todas las tarjetas
3. Puedes simular una venta seleccionando un producto y cantidad
4. Observa cómo se actualizan en tiempo real los diferentes componentes

## ⚠️ Nota Importante

Esta página es completamente independiente del resto de la aplicación OptusFrontend. No afecta ni modifica ninguna funcionalidad existente.
