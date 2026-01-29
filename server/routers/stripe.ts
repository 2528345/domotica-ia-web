import { protectedProcedure, router } from "../_core/trpc";
import { getProductById, createOrder } from "../db";
import { z } from "zod";

/**
 * Router de Stripe para manejo de pagos
 * 
 * Requiere variables de entorno:
 * - STRIPE_SECRET_KEY: Clave secreta de Stripe
 * - STRIPE_PUBLISHABLE_KEY: Clave pública de Stripe
 */

// Inicializar cliente de Stripe de forma segura
let stripeClient: any = null;

function getStripe() {
  if (!stripeClient && process.env.STRIPE_SECRET_KEY) {
    try {
      const Stripe = require("stripe");
      stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-12-18.acacia",
      });
    } catch (error) {
      console.error("Error initializing Stripe:", error);
    }
  }
  return stripeClient;
}

export const stripeRouter = router({
  /**
   * Obtener clave pública de Stripe para el frontend
   */
  getPublishableKey: protectedProcedure.query(async () => {
    return {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
      isConfigured: !!process.env.STRIPE_SECRET_KEY && !!process.env.STRIPE_PUBLISHABLE_KEY,
    };
  }),

  /**
   * Crear una sesión de checkout en Stripe
   */
  createCheckoutSession: protectedProcedure
    .input(z.object({ productId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Validar que Stripe esté configurado
        if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PUBLISHABLE_KEY) {
          throw new Error(
            "Stripe no está configurado. Por favor, agrega tus claves de Stripe en Settings → Secrets"
          );
        }

        const stripe = getStripe();
        if (!stripe) {
          throw new Error("No se pudo inicializar Stripe");
        }

        const product = await getProductById(input.productId);
        
        if (!product) {
          throw new Error("Producto no encontrado");
        }

        // Crear orden en la base de datos
        const orderResult = await createOrder({
          userId: ctx.user.id,
          productId: product.id,
          amount: product.price,
          currency: product.currency,
          status: "pending",
          stripeSessionId: "temp", // Se actualizará después
          stripePaymentIntentId: null,
        });

        const orderId = (orderResult as any).insertId || 0;

        // Crear sesión de checkout en Stripe
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price: product.stripePriceId,
              quantity: 1,
            },
          ],
          mode: product.type === "subscription" ? "subscription" : "payment",
          success_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/pricing`,
          customer_email: ctx.user.email || undefined,
          metadata: {
            orderId: orderId.toString(),
            userId: ctx.user.id.toString(),
            productId: product.id.toString(),
          },
        });

        return {
          url: session.url,
          sessionId: session.id,
          success: true,
        };
      } catch (error) {
        console.error("Error creating checkout session:", error);
        throw new Error(
          error instanceof Error ? error.message : "No se pudo crear la sesión de pago"
        );
      }
    }),

  /**
   * Obtener estado de una sesión de checkout
   */
  getCheckoutSession: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      try {
        if (!process.env.STRIPE_SECRET_KEY) {
          throw new Error("Stripe no está configurado");
        }

        const stripe = getStripe();
        if (!stripe) {
          throw new Error("No se pudo inicializar Stripe");
        }

        const session = await stripe.checkout.sessions.retrieve(input.sessionId);
        
        return {
          id: session.id,
          payment_status: session.payment_status,
          customer_email: session.customer_email,
          amount_total: session.amount_total,
          currency: session.currency,
          status: session.status,
        };
      } catch (error) {
        console.error("Error retrieving checkout session:", error);
        throw new Error("No se pudo obtener la sesión de pago");
      }
    }),

  /**
   * Obtener métodos de pago guardados del usuario
   */
  getPaymentMethods: protectedProcedure.query(async ({ ctx }) => {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        return [];
      }

      const stripe = getStripe();
      if (!stripe) {
        return [];
      }

      // Buscar cliente de Stripe por email
      const customers = await stripe.customers.list({
        email: ctx.user.email || undefined,
        limit: 1,
      });

      if (customers.data.length === 0) {
        return [];
      }

      const customerId = customers.data[0].id;

      // Obtener métodos de pago del cliente
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
      });

      return paymentMethods.data.map((method: any) => ({
        id: method.id,
        brand: (method.card?.brand || "unknown").toUpperCase(),
        last4: method.card?.last4 || "",
        expMonth: method.card?.exp_month || 0,
        expYear: method.card?.exp_year || 0,
      }));
    } catch (error) {
      console.error("Error retrieving payment methods:", error);
      return [];
    }
  }),

  /**
   * Crear un cliente de Stripe para el usuario
   */
  createCustomer: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Stripe no está configurado");
      }

      const stripe = getStripe();
      if (!stripe) {
        throw new Error("No se pudo inicializar Stripe");
      }

      // Verificar si el cliente ya existe
      const customers = await stripe.customers.list({
        email: ctx.user.email || undefined,
        limit: 1,
      });

      if (customers.data.length > 0) {
        return {
          customerId: customers.data[0].id,
          isNew: false,
        };
      }

      // Crear nuevo cliente
      const customer = await stripe.customers.create({
        email: ctx.user.email || undefined,
        name: ctx.user.name || undefined,
        metadata: {
          userId: ctx.user.id.toString(),
        },
      });

      return {
        customerId: customer.id,
        isNew: true,
      };
    } catch (error) {
      console.error("Error creating customer:", error);
      throw new Error("No se pudo crear el cliente de pago");
    }
  }),
});
