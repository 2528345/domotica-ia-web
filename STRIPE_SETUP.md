# Guía Completa de Integración de Stripe

Este documento explica cómo completar la integración de Stripe en tu sitio web de domótica con IA offline.

## 📋 Tabla de Contenidos

1. [Obtener Claves de Stripe](#obtener-claves-de-stripe)
2. [Configurar Variables de Entorno](#configurar-variables-de-entorno)
3. [Crear Productos en Stripe](#crear-productos-en-stripe)
4. [Agregar Productos a la Base de Datos](#agregar-productos-a-la-base-de-datos)
5. [Configurar Webhooks](#configurar-webhooks)
6. [Probar la Integración](#probar-la-integración)
7. [Componentes Disponibles](#componentes-disponibles)
8. [API Reference](#api-reference)

---

## 1. Obtener Claves de Stripe

### Paso 1: Crear Cuenta de Stripe

1. Ve a https://stripe.com
2. Haz clic en "Sign up" (Registrarse)
3. Completa el formulario con tus datos
4. Verifica tu correo electrónico

### Paso 2: Obtener Claves de API

1. Inicia sesión en https://dashboard.stripe.com
2. Ve a **Developers** → **API keys** (en la barra lateral izquierda)
3. Asegúrate de estar en **Test mode** (esquina superior derecha)
4. Copia las siguientes claves:
   - **Publishable key** (comienza con `pk_test_`)
   - **Secret key** (comienza con `sk_test_`)

⚠️ **Importante**: Usa claves de prueba (test mode) primero. Cambia a producción solo cuando estés listo.

---

## 2. Configurar Variables de Entorno

### En el Panel de Manus

1. Ve a **Settings** → **Secrets**
2. Agrega las siguientes variables:

```
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

3. Haz clic en **Save**

### Verificar Configuración

Una vez guardadas, el servidor se reiniciará automáticamente. Puedes verificar que está funcionando visitando `/pricing` en tu sitio.

---

## 3. Crear Productos en Stripe

### Paso 1: Ir a Productos

1. En el dashboard de Stripe, ve a **Products** (en la barra lateral)
2. Haz clic en **+ Add product**

### Paso 2: Crear Producto

Completa los siguientes campos:

**Para Productos Únicos:**
- **Name**: Nombre del producto (ej: "Licencia Domótica Pro")
- **Description**: Descripción breve
- **Pricing**: Selecciona "One-time"
- **Price**: Precio (ej: 99.99)
- **Currency**: USD (o tu moneda)

**Para Suscripciones:**
- **Name**: Nombre del plan (ej: "Plan Premium Mensual")
- **Description**: Descripción
- **Pricing**: Selecciona "Recurring"
- **Billing period**: Monthly (o Annual)
- **Price**: Precio por período

### Paso 3: Copiar IDs

Una vez creado, copia:
- **Product ID** (comienza con `prod_`)
- **Price ID** (comienza con `price_`)

Necesitarás estos IDs en el siguiente paso.

---

## 4. Agregar Productos a la Base de Datos

### Opción A: Usar Panel de Base de Datos (Recomendado)

1. Ve a **Management UI** → **Database**
2. Selecciona la tabla `products`
3. Haz clic en **+ Add Row**
4. Completa los campos:

| Campo | Valor | Ejemplo |
|-------|-------|---------|
| `stripeProductId` | Product ID de Stripe | `prod_xxxxx` |
| `name` | Nombre del producto | `Licencia Pro` |
| `description` | Descripción | `Acceso completo a todas las características` |
| `type` | `product` o `subscription` | `product` |
| `price` | Precio en decimal | `99.99` |
| `currency` | Código de moneda | `USD` |
| `stripePriceId` | Price ID de Stripe | `price_xxxxx` |
| `image` | URL de imagen | `/images/product.png` |
| `features` | JSON array de características | `["Característica 1", "Característica 2"]` |
| `isActive` | `true` o `false` | `true` |

### Opción B: Usar SQL

```sql
INSERT INTO products (
  stripeProductId,
  name,
  description,
  type,
  price,
  currency,
  stripePriceId,
  image,
  features,
  isActive
) VALUES (
  'prod_xxxxx',
  'Licencia Domótica Pro',
  'Acceso completo a todas las características premium',
  'product',
  99.99,
  'USD',
  'price_xxxxx',
  '/images/product-pro.png',
  '["Control total del hogar", "IA offline", "Soporte prioritario"]',
  true
);
```

---

## 5. Configurar Webhooks

Los webhooks permiten que Stripe notifique a tu servidor cuando ocurren eventos (pagos completados, suscripciones canceladas, etc.).

### Paso 1: Crear Endpoint de Webhook

1. En el dashboard de Stripe, ve a **Developers** → **Webhooks**
2. Haz clic en **+ Add endpoint**
3. En "Endpoint URL", ingresa:
   ```
   https://tudominio.com/api/webhooks/stripe
   ```
   (Reemplaza `tudominio.com` con tu dominio real)

### Paso 2: Seleccionar Eventos

Selecciona los siguientes eventos:
- `checkout.session.completed` - Pago completado
- `invoice.payment_succeeded` - Pago de suscripción exitoso
- `customer.subscription.deleted` - Suscripción cancelada
- `charge.failed` - Pago fallido

### Paso 3: Obtener Signing Secret

1. Una vez creado el endpoint, copia el **Signing Secret** (comienza con `whsec_`)
2. Agrega a tus variables de entorno:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

---

## 6. Probar la Integración

### Paso 1: Acceder a Página de Precios

1. Ve a `https://tudominio.com/pricing`
2. Deberías ver tus productos listados

### Paso 2: Usar Tarjetas de Prueba

Stripe proporciona tarjetas de prueba para diferentes escenarios:

| Tarjeta | Número | Exp | CVC | Resultado |
|---------|--------|-----|-----|-----------|
| Éxito | `4242 4242 4242 4242` | 12/25 | 123 | Pago exitoso |
| Declinada | `4000 0000 0000 0002` | 12/25 | 123 | Pago rechazado |
| Requiere 3D Secure | `4000 0025 0000 3155` | 12/25 | 123 | Requiere autenticación |

### Paso 3: Completar Pago

1. Haz clic en "Comprar" o "Suscribirse" en un producto
2. Serás redirigido a Stripe Checkout
3. Completa el formulario con:
   - Email: cualquier email
   - Tarjeta: usa una de las tarjetas de prueba arriba
   - Nombre: cualquier nombre
4. Haz clic en "Pay" (Pagar)

### Paso 4: Verificar Resultado

- Si el pago es exitoso, serás redirigido a `/checkout/success`
- Verifica en el dashboard de Stripe que el pago aparezca

---

## 7. Componentes Disponibles

### ProductCard
Componente que muestra un producto con:
- Imagen
- Nombre y descripción
- Precio
- Lista de características
- Botón de compra/suscripción

```tsx
import ProductCard from '@/components/ProductCard';

<ProductCard 
  product={product}
  onSelectProduct={handleSelect}
  isLoading={isLoading}
/>
```

### Pricing Page
Página completa que lista todos los productos:
- Ubicación: `/pricing`
- Muestra productos activos
- Integración con autenticación
- Notificaciones de estado

### CheckoutSuccess Page
Página de confirmación después del pago:
- Ubicación: `/checkout/success?session_id=...`
- Verifica estado del pago
- Muestra detalles de la compra
- Botones de navegación

---

## 8. API Reference

### Procedimientos tRPC

#### `stripe.getPublishableKey`
Obtiene la clave pública de Stripe.

```typescript
const { data } = trpc.stripe.getPublishableKey.useQuery();
// Retorna: { publishableKey: string, isConfigured: boolean }
```

#### `stripe.createCheckoutSession`
Crea una sesión de checkout en Stripe.

```typescript
const mutation = trpc.stripe.createCheckoutSession.useMutation();
mutation.mutate({ productId: 1 });
// Retorna: { url: string, sessionId: string, success: boolean }
```

#### `stripe.getCheckoutSession`
Obtiene el estado de una sesión de checkout.

```typescript
const { data } = trpc.stripe.getCheckoutSession.useQuery(
  { sessionId: 'cs_test_xxxxx' }
);
// Retorna: { id, payment_status, customer_email, amount_total, currency, status }
```

#### `stripe.createCustomer`
Crea o encuentra un cliente de Stripe.

```typescript
const mutation = trpc.stripe.createCustomer.useMutation();
mutation.mutate();
// Retorna: { customerId: string, isNew: boolean }
```

#### `stripe.getPaymentMethods`
Obtiene los métodos de pago guardados del usuario.

```typescript
const { data } = trpc.stripe.getPaymentMethods.useQuery();
// Retorna: Array de { id, brand, last4, expMonth, expYear }
```

---

## 🔒 Seguridad

### Mejores Prácticas

1. **Nunca compartas tu Secret Key**
   - Solo úsala en el backend
   - No la incluyas en código frontend
   - No la publiques en repositorios públicos

2. **Usa HTTPS siempre**
   - Todos los endpoints de pago deben ser HTTPS
   - Stripe rechazará conexiones HTTP

3. **Valida en el backend**
   - Verifica los montos antes de procesar
   - Valida que el usuario sea el propietario de la orden
   - Usa webhooks para confirmar pagos

4. **Mantén secretos seguros**
   - Usa variables de entorno
   - Nunca las commits en git
   - Rota las claves periódicamente

---

## 🐛 Solución de Problemas

### "Stripe no está configurado"
- Verifica que hayas agregado las variables de entorno
- Asegúrate de que las claves sean correctas
- Reinicia el servidor después de cambiar las variables

### "Sesión de checkout no encontrada"
- Verifica que el `sessionId` sea correcto
- Asegúrate de que la sesión no haya expirado (24 horas)
- Comprueba que Stripe esté en el mismo modo (test/live)

### "Tarjeta rechazada"
- Usa las tarjetas de prueba proporcionadas por Stripe
- Verifica que estés en modo test
- Comprueba que el monto sea válido

### "Webhook no se ejecuta"
- Verifica la URL del webhook en el dashboard
- Asegúrate de que sea HTTPS
- Comprueba los logs de eventos en Stripe

---

## 📚 Recursos Adicionales

- [Documentación de Stripe](https://stripe.com/docs)
- [API Reference de Stripe](https://stripe.com/docs/api)
- [Tarjetas de Prueba](https://stripe.com/docs/testing)
- [Webhooks de Stripe](https://stripe.com/docs/webhooks)
- [Checkout de Stripe](https://stripe.com/docs/payments/checkout)

---

## ✅ Checklist de Implementación

- [ ] Crear cuenta de Stripe
- [ ] Obtener claves de API (test mode)
- [ ] Agregar variables de entorno
- [ ] Crear productos en Stripe
- [ ] Agregar productos a la base de datos
- [ ] Configurar webhooks
- [ ] Probar con tarjetas de prueba
- [ ] Verificar página de precios
- [ ] Verificar página de confirmación
- [ ] Cambiar a modo producción (cuando esté listo)
- [ ] Obtener claves de producción
- [ ] Actualizar variables de entorno

---

**¿Necesitas ayuda?** Contacta con el soporte de Stripe o revisa la documentación oficial.
