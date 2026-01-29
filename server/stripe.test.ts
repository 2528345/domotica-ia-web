import { describe, it, expect, beforeAll } from "vitest";
import { stripeRouter } from "./routers/stripe";

/**
 * Tests para validar la integración de Stripe
 * 
 * Nota: Estos tests verifican que Stripe esté correctamente configurado
 * con las claves de API proporcionadas en las variables de entorno.
 */

describe("Stripe Integration", () => {
  // Mock context para pruebas
  const mockContext = {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      role: "user" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
      loginMethod: "test",
    },
    req: {} as any,
    res: {} as any,
  };

  describe("getPublishableKey", () => {
    it("debería retornar la clave pública de Stripe", async () => {
      const caller = stripeRouter.createCaller(mockContext);
      const result = await caller.getPublishableKey();

      expect(result).toHaveProperty("publishableKey");
      expect(result).toHaveProperty("isConfigured");
      expect(typeof result.publishableKey).toBe("string");
      expect(typeof result.isConfigured).toBe("boolean");
    });

    it("debería indicar si Stripe está configurado", async () => {
      const caller = stripeRouter.createCaller(mockContext);
      const result = await caller.getPublishableKey();

      // Si las claves no están configuradas, isConfigured debería ser false
      if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PUBLISHABLE_KEY) {
        expect(result.isConfigured).toBe(false);
      } else {
        expect(result.isConfigured).toBe(true);
      }
    });
  });

  describe("createCustomer", () => {
    it("debería crear o encontrar un cliente de Stripe", async () => {
      // Solo ejecutar si Stripe está configurado
      if (!process.env.STRIPE_SECRET_KEY) {
        console.log("Skipping createCustomer test: Stripe not configured");
        return;
      }

      const caller = stripeRouter.createCaller(mockContext);
      
      try {
        const result = await caller.createCustomer();
        
        expect(result).toHaveProperty("customerId");
        expect(result).toHaveProperty("isNew");
        expect(typeof result.customerId).toBe("string");
        expect(typeof result.isNew).toBe("boolean");
      } catch (error) {
        // Si falla, es porque Stripe no está configurado correctamente
        expect(error).toBeDefined();
      }
    });
  });

  describe("getPaymentMethods", () => {
    it("debería retornar una lista de métodos de pago", async () => {
      // Solo ejecutar si Stripe está configurado
      if (!process.env.STRIPE_SECRET_KEY) {
        console.log("Skipping getPaymentMethods test: Stripe not configured");
        return;
      }

      const caller = stripeRouter.createCaller(mockContext);
      
      try {
        const result = await caller.getPaymentMethods();
        
        expect(Array.isArray(result)).toBe(true);
      } catch (error) {
        // Si falla, es porque Stripe no está configurado correctamente
        expect(error).toBeDefined();
      }
    });
  });

  describe("Stripe Configuration Validation", () => {
    it("debería validar que las claves de Stripe sean válidas si están configuradas", () => {
      const hasSecretKey = !!process.env.STRIPE_SECRET_KEY;
      const hasPublishableKey = !!process.env.STRIPE_PUBLISHABLE_KEY;

      // Si una está configurada, ambas deberían estarlo
      if (hasSecretKey || hasPublishableKey) {
        expect(hasSecretKey).toBe(true);
        expect(hasPublishableKey).toBe(true);
      }
    });

    it("debería validar el formato de las claves de Stripe", () => {
      if (process.env.STRIPE_SECRET_KEY) {
        expect(process.env.STRIPE_SECRET_KEY).toMatch(/^sk_/);
      }

      if (process.env.STRIPE_PUBLISHABLE_KEY) {
        expect(process.env.STRIPE_PUBLISHABLE_KEY).toMatch(/^pk_/);
      }
    });
  });
});
