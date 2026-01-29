# Guía de Integración de Stripe

Este documento explica cómo completar la integración de Stripe en tu sitio web de domótica.

## 1. Obtener Claves de Stripe

1. Ve a https://dashboard.stripe.com/apikeys
2. Copia tu **Publishable Key** (comienza con `pk_`)
3. Copia tu **Secret Key** (comienza con `sk_`)

## 2. Configurar Variables de Entorno

Agrega las siguientes variables de entorno en el panel de Settings → Secrets:

```
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

## 3. Instalar Stripe

```bash
pnpm add stripe @stripe/react-stripe-js
```

## 4. Actualizar el Router de Stripe

En `server/routers/stripe.ts`, descomenta y completa la integración:

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// En createCheckoutSession:
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price: product.stripePriceId,
    quantity: 1,
  }],
  mode: product.type === 'subscription' ? 'subscription' : 'payment',
  success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.FRONTEND_URL}/pricing`,
  customer_email: ctx.user.email || undefined,
});

return { url: session.url, sessionId: session.id };
```

## 5. Crear Productos en Stripe

1. Ve a https://dashboard.stripe.com/products
2. Crea tus productos con precios
3. Copia los IDs de producto y precio
4. Agrega los productos a tu base de datos:

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
  'Nombre del Producto',
  'Descripción',
  'product',
  '99.99',
  'USD',
  'price_xxxxx',
  '/images/product.png',
  '["Característica 1", "Característica 2"]',
  true
);
```

## 6. Configurar Webhooks

1. Ve a https://dashboard.stripe.com/webhooks
2. Crea un nuevo endpoint con tu URL de webhook: `https://tudominio.com/api/webhooks/stripe`
3. Selecciona los eventos:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`

4. Copia el Signing Secret y agrégalo a tus variables de entorno:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## 7. Implementar Webhook Handler

Crea `server/webhooks/stripe.ts`:

```typescript
import Stripe from 'stripe';
import { updateOrderStatus } from '../db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function handleStripeWebhook(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Webhook Error', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      // Actualizar orden en la base de datos
      if (session.metadata?.orderId) {
        await updateOrderStatus(parseInt(session.metadata.orderId), 'completed');
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      // Manejar cancelación de suscripción
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
```

## 8. Agregar Endpoint de Webhook

En `server/_core/index.ts`, agrega:

```typescript
import { handleStripeWebhook } from '../webhooks/stripe';

app.post('/api/webhooks/stripe', async (req, res) => {
  const response = await handleStripeWebhook(req);
  res.status(response.status).send(await response.text());
});
```

## 9. Probar la Integración

1. Usa tarjetas de prueba de Stripe: https://stripe.com/docs/testing
2. Tarjeta válida: `4242 4242 4242 4242`
3. Ve a `/pricing` en tu sitio
4. Selecciona un producto y completa el pago

## Componentes Implementados

- ✅ **ProductCard**: Tarjeta de producto con características
- ✅ **Pricing**: Página de productos y suscripciones
- ✅ **CheckoutSuccess**: Página de confirmación de pago
- ✅ **Router de Stripe**: Procedimientos tRPC para checkout
- ✅ **Base de datos**: Tablas para productos, órdenes y suscripciones

## Próximos Pasos

1. Instalar Stripe SDK
2. Configurar variables de entorno
3. Crear productos en Stripe
4. Implementar webhooks
5. Probar flujo de pago completo

## Recursos

- Documentación de Stripe: https://stripe.com/docs
- Stripe API Reference: https://stripe.com/docs/api
- Stripe Testing: https://stripe.com/docs/testing
